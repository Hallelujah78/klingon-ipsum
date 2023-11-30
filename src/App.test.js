import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App.jsx";
import createServer from "./test/server.js";
import { http, HttpResponse } from "msw";
import klingonWords from "./data/data.jsx";
import pause from "./test/pause.js";

import { mockTestString } from "./test/testSting.js";

jest.mock("./utils/generateWordArray.js", () => {
  return {
    generateWordArray: () => {
      const tempString = mockTestString;
      return tempString.split();
    },
  };
});

const renderComponent = async () => {
  render(<App />);
  await screen.findByRole("spinbutton");
};

const inputValueAndGenerate = async (value) => {
  const input = await screen.findByRole("spinbutton");
  const button = await screen.findByRole("button", {
    name: /i want that thing!/i,
  });

  await user.click(input);
  await user.keyboard(value);
  await user.click(button);
  return { button, input };
};

jest.mock("uuid", () => {
  const base = "9134e286-6f71-427a-bf00-";
  let current = 100000000000;

  return {
    v4: () => {
      const uuid = base + current.toString();
      current++;

      return uuid;
    },
  };
});

describe("while loading", () => {
  createServer([
    http.get(
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      () => {
        return HttpResponse.json({
          dictionary: klingonWords,
        });
      }
    ),
  ]);

  test("a loading spinner is shown", async () => {
    render(<App />);

    const spinner = await screen.findByTestId("loading-spinner");

    expect(spinner).toBeInTheDocument();
  });
});

describe("after data has been fetched", () => {
  createServer([
    http.get(
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      () => {
        return HttpResponse.json({
          dictionary: klingonWords,
        });
      }
    ),
  ]);

  test("an input is visible", async () => {
    await renderComponent();
    const input = await screen.findByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });

  test("a button is visible", async () => {
    await renderComponent();

    const button = await screen.findByRole("button", {
      name: /i want that thing!/i,
    });
    expect(button).toBeInTheDocument();
  });

  test("if the user attempts to enter nonnumeric values in the input, the value is not updated and a warning is displayed", async () => {
    await renderComponent();

    const { input, button } = await inputValueAndGenerate("abcdefg");

    const alert = await screen.findByTestId("alert");

    expect(input).toHaveValue(null);
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("please enter a positive number");
  });

  test("if the user enters a negative number in the input and attempts to generate paragraphs, a warning is displayed", async () => {
    await renderComponent();
    const { input, button } = await inputValueAndGenerate("-20");

    const alert = await screen.findByTestId("alert");

    expect(input).toHaveValue(-20);
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("please enter a positive number");
  });

  test("if the user enters 0 in the input and attempts to generate paragraphs, a warning is displayed", async () => {
    await renderComponent();
    const { input, button } = await inputValueAndGenerate("0");

    const alert = await screen.findByTestId("alert");

    expect(input).toHaveValue(0);
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("please enter a positive number");
  });

  test.only("if the user enters a positive number in the input and attempts to generate paragraphs, a progress bar is displayed", async () => {
    await renderComponent();
    const input = await screen.findByRole("spinbutton");
    const button = await screen.findByRole("button", {
      name: /i want that thing!/i,
    });

    await user.click(input);
    await user.keyboard("2002");
    await user.click(button);

    const progressbar = await screen.findByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    await waitFor(
      async () => await screen.findAllByTestId("paragraph-component"),
      {
        timeout: 4500,
      }
    );
  }, 10000);
});

// wait for paragraph and then should find success alert
describe("after data has been fetched and the page has loaded", () => {
  createServer([
    http.get(
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      () => {
        return HttpResponse.json({
          dictionary: klingonWords,
        });
      }
    ),
  ]);

  test.only("if the user enters a positive number in the input and attempts to generate paragraphs, a success alert is displayed", async () => {
    await renderComponent();
    await inputValueAndGenerate("2000");

    await waitFor(
      async () => await screen.findAllByTestId("paragraph-component"),
      {
        timeout: 4500,
      }
    );

    const alert = await screen.findByTestId("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(/success!/i);
  }, 10000);
});
