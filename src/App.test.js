import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import klingonWords from "./data/data.jsx";

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
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 10000);
  });
};
