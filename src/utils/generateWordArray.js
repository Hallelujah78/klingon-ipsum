import { generateRandomNumber } from "./utils";

export const generateWordArray = async (setProgress, dictionary, words) => {
  const maxProgress = 100;
  const batchSize = Math.floor(words / 100);

  let text = [];

  // generate the 'text' by adding words and punctuation to an array
  for (let i = 0; i < words; i++) {
    //   if (i === 0) {
    //     text.push(dictionary[generateRandomNumber(dictionary)]);
    //   }
    //   if (i === words - 1) {
    //     text.push(".");
    //   } else {
    //     text.push(" ");
    //     text.push(dictionary[generateRandomNumber(dictionary)]);
    //   }

    if (i !== 0 && i !== words - 1) {
      text.push(" ");
      text.push(dictionary[generateRandomNumber(dictionary)]);
    } else if (i === words - 1) {
      text.push(".");
    } else {
      text.push(dictionary[generateRandomNumber(dictionary)]);
    }

    if (i % batchSize === 0) {
      const newProgress = Math.floor((i / words) * maxProgress);
      setProgress(newProgress);

      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
  //end of generating the text array
  setProgress(100);
  return text;
};
