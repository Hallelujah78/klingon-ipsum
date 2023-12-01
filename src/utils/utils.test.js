import { generateRandomNumber } from "./utils";

describe("generateRandomNumber", () => {
  test("test", () => {
    expect([0, 1, 2, 3]).toContain(generateRandomNumber(["a", "b", "c", "d"]));
  });
});
