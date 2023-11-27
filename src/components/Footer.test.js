import { screen, render } from "@testing-library/react";
import Footer from "./Footer.jsx";

test("a link to a portfolio on netlify is displayed", () => {
  render(<Footer />);
  const link = screen.getByRole("link", { name: /portfolio/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute(
    "href",
    "https://gwib-personal-portfolio-react.netlify.app/"
  );
});

test("a paragraph with copyright notice and the year is displayed", () => {
  render(<Footer />);
  const paragraph = screen.getByText(/(© Gavan Browne) 20\d{2}/i);
  expect(paragraph).toBeInTheDocument();
});
