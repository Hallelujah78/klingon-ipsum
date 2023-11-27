import { screen, render } from "@testing-library/react";
import Loading from "./Loading.jsx";

test("displays an element that serves as a loading spinner", () => {
  render(<Loading />);
  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
  expect(loadingSpinner).toHaveClass("loading");
});
