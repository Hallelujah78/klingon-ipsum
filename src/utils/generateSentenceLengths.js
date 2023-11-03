import { generateRandomNumber } from "./utils";

export const generateSentenceLengths = async (setProgressLengths, words) => {
  const sentenceLength = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const maxProgressLengths = 100;
  const batchSizeLengths = Math.floor(words / sentenceLength[0] / 100);

  // start of generate an array of sentence lengths
  const lengths = [];
  for (let i = 0; i <= words / sentenceLength[0] / 2; i++) {
    lengths.push(sentenceLength[generateRandomNumber(sentenceLength)]);

    if (i % batchSizeLengths === 0) {
      const newProgress = Math.floor(
        (i / (words / sentenceLength[0] / 2)) * maxProgressLengths
      );
      setProgressLengths(newProgress);

      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  setProgressLengths(100);
  return lengths;
};
// end of generate an array of sentence lengths
