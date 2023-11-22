import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import klingonWords from "./data/data.jsx";

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

const handlers = [
  http.get(
    "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
    () => {
      return HttpResponse.json({ data: klingonWords });
    }
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("a simple test", async () => {
  render(<App />);
  await pause();
  const button = await screen.findByRole("button");
  expect(button).toBeInTheDocument();
  screen.debug();
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};
