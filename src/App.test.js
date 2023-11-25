import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import createServer from "./test/server.js";
import handlers from "./test/handlers.js";
import { http, HttpResponse } from "msw";
import klingonWords from "./data/data.jsx";

const renderComponent = async () => {
  render(<App />);
  await screen.findByRole("spinbutton");
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
    screen.debug();
    expect(spinner).toBeInTheDocument();
  });
});

// !isLoading && !isError && !showProgress
// a button is visible
// an input is visible
// a progressbar is not visible

// !isLoading && !isError && showProgress
// a progressbar is visible

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
    screen.debug();
    // const button = await screen.findByRole("button");
    // expect(button).toBeInTheDocument();
  });
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};
