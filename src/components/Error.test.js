import { screen, render } from "@testing-library/react";
import Error from "./Error.jsx";

test("a heading with text is displayed", () => {
  render(<Error />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("a link to refresh the page is displayed", () => {
  render(<Error />);

  const link = screen.getByRole("link", { name: /refresh/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/");
});
