import { screen, render } from "@testing-library/react";
import Paragraph from "./Paragraph";

test("renders a paragraph element on the screen containing a paragraph of 20 words.", () => {
  const paragraph =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates aspernatur adipisci earum? Dolores, modi quibusdam quod neque aliquid hic quos.";
  render(<Paragraph paragraph={paragraph} />);
  const paragraphDOM = screen.getByText(/Lorem ipsum/);
  const numberOfWords = paragraphDOM.textContent.split(" ").length;
  expect(numberOfWords).toEqual(20);
});
