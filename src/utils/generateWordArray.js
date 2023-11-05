import { generateRandomNumber } from "./utils";

export const generateWordArray = async (setProgress, dictionary, words) => {
  const maxProgress = 100;
  const batchSize = Math.floor((words * 2) / 100);

  let text = new Array(words * 2);
  let period = ".";
  let space = " ";

  // generate the 'text' by adding words and punctuation to an array
  for (let i = 0; i < words * 2; i = i + 2) {
    text[i] = dictionary[generateRandomNumber(dictionary)];
    text[i + 1] = space;

    if (i % batchSize === 0) {
      const newProgress = Math.floor((i / (words * 2)) * maxProgress);
      setProgress(newProgress);

      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
  //end of generating the text array
  setProgress(100);
  text.pop();
  text.push(period);

  return text;
};
