import { screen, render } from "@testing-library/react";
import Progress from "./Progress.jsx";

const renderComponent = () => {
  const progress = 55;
  const progressText = "Progress!";
  render(<Progress progress={progress} progressText={progressText} />);
  return { progress, progressText };
};

test("displays a progress bar element", () => {
  const props = renderComponent();
  const progressbar = screen.getByRole("progressbar");
  expect(progressbar).toHaveValue(props.progress);
  expect(progressbar).toBeInTheDocument();
});

test("displays an element that renders the value of progressText and progress", () => {
  const props = renderComponent();
  const paragraph = screen.getByTestId("progress-text");
  expect(paragraph).toBeInTheDocument();
  expect(paragraph).toHaveTextContent(props.progress);
  expect(paragraph).toHaveTextContent(props.progressText);
});
