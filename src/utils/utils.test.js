import { generateRandomNumber } from "./utils";
import { generateWordArray } from "./generateWordArray";

const mockSetProgress = jest.fn();

describe("generateRandomNumber", () => {
  test("when provided with an array of elements, returns a number which is an index value", () => {
    expect([0, 1, 2, 3]).toContain(generateRandomNumber(["a", "b", "c", "d"]));
  });
});

describe("generateWordArray", () => {
  test("when provided with a function to update progress, a dictionary of words as an array, and a number of words - setProgress, dictionary, words - it returns 'text' which is an array that contains N words where N is equal to the value of 'words'", async () => {
    const array = await generateWordArray(
      mockSetProgress,
      ["a", "b", "c", "d"],
      2
    );
    expect(array).toHaveLength(2 * 2);
  });
});
