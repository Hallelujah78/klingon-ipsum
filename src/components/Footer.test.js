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
