import { generateRandomNumber } from "./utils";

export const generateParagraphs = async (text, setProgressParagraphs) => {
  const maxProgressParagraphs = 100;
  const paraLength = [5, 6, 7];

  // turn our array of sentences into a string
  const string = text.join("");
  // split our string into an array of sentences and retain the full stops
  const sentenceArray = string.split(/(?<=\.)/);

  const numSentences = sentenceArray.length;

  // start of generate an array of paragraph lengths
  const paragraphLengths = new Uint8Array(
    Math.ceil(numSentences / paraLength[0])
  );

  for (let h = 0; h <= numSentences / paraLength[0]; h++) {
    paragraphLengths[h] = paraLength[generateRandomNumber(paraLength)];
  }

  // end of generate an array of paragraph lengths

  const paragraphLengthsLength = paragraphLengths.length; // the number of paragraphs

  const batchSizeParagraphs = Math.ceil(paragraphLengthsLength / 100);

  const tempText = new Array(paragraphLengthsLength); // holds our paragraphs in an array to be returned

  // number of sentences in our array
  let remainingSentences = sentenceArray.length;

  for (let i = 0; i < paragraphLengthsLength; i++) {
    let tempString = ""; // holds our paragraph as we construct it

    //******** 1 - paragraph length is smaller than or equal to remaining number of sentences in our sentenceArray *******/
    // if length <= sentenceArray.length
    // then just shift lines from sentenceArray to create a paragraph
    if (paragraphLengths[i] <= remainingSentences) {
      for (let j = paragraphLengths[i]; j > 0; j--) {
        tempString = tempString + sentenceArray.shift();
        remainingSentences = remainingSentences - 1;
      }
      tempText[i] = tempString;
    }

    //******** 2 - allow short paragraph lengths where remaining number of sentences is less than length but greater than or equal to 2 *******/
    // if length > sentenceArray.length AND sentenceArray.length >= 2
    // then just create a short paragraph and return false
    else if (
      paragraphLengths[i] > remainingSentences &&
      remainingSentences >= 2
    ) {
      for (let k = sentenceArray.length; k > 0; k--) {
        tempString = tempString + sentenceArray.shift();
        remainingSentences = remainingSentences - 1;
      }

      tempText[i] = tempString;
      // we can return here - this is the end of the array
    }

    //******** 3 - widowed lines - prevent paragraphs of less than two lines *******/
    // if length > sentenceArray.length
    // and sentenceArray.length <2
    // then put remaining sentences with previous paragraph if it exists
    // return false
    else if (
      paragraphLengths[i] > remainingSentences &&
      remainingSentences < 2 &&
      remainingSentences > 0
    ) {
      tempString = sentenceArray.shift();
      remainingSentences = remainingSentences - 1;

      tempText[i - 1] !== undefined
        ? (tempText[i - 1] = tempText[i - 1] + tempString)
        : (tempText[i] = tempString);
    }

    if (i % batchSizeParagraphs === 0) {
      const newProgress = Math.floor(
        (i / paragraphLengthsLength) * maxProgressParagraphs
      );
      setProgressParagraphs(newProgress);

      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    //********* 0 - number of sentences generated is less than 2 ******/
  }

  setProgressParagraphs(100);
  return tempText;
};
