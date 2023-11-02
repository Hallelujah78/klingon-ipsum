import { generateRandomNumber } from "./utils";

export const generateParagraphs = async (text, setProgressParagraphs) => {
  const textArray = [...text];
  const maxProgressParagraphs = 100;
  const paraLength = [5, 6, 7];

  // turn our array of sentences into a string
  const string = textArray.join("");
  // split our string into an array of sentences and retain the full stops
  const sentenceArray = string.split(/(?<=\.)/);
  // number of sentences in our array
  const numSentences = sentenceArray.length;

  // start of generate an array of paragraph lengths
  const paragraphLengths = [];
  for (let h = 0; h <= numSentences / paraLength[0]; h++) {
    paragraphLengths.push(paraLength[generateRandomNumber(paraLength)]);
  }
  // end of generate an array of sentence lengths
  const paragraphLengthsLength = paragraphLengths.length;
  const batchSizeParagraphs = Math.ceil(paragraphLengthsLength / 100);

  const tempText = [];
  for (let i = 0; i < paragraphLengthsLength; i++) {
    let tempString = "";

    //******** 1 - paragraph length is smaller than or equal to remaining number of sentences in our sentenceArray *******/
    // if length <= sentenceArray.length
    // then just shift lines from sentenceArray to create a paragraph
    if (paragraphLengths[i] <= sentenceArray.length) {
      for (let j = paragraphLengths[i]; j > 0; j--) {
        tempString = tempString + sentenceArray.shift();
      }
      tempText.push(tempString);
    }

    //******** 2 - allow short paragraph lengths where remaining number of sentences is less than length but greater than or equal to 2 *******/
    // if length > sentenceArray.length AND sentenceArray.length >= 2
    // then just create a short paragraph and return false
    if (
      paragraphLengths[i] > sentenceArray.length &&
      sentenceArray.length >= 2
    ) {
      for (let k = sentenceArray.length; k > 0; k--) {
        tempString = tempString + sentenceArray.shift();
      }

      tempText.push(tempString);
    }

    //******** 3 - widowed lines - prevent paragraphs of less than two lines *******/
    // if length > sentenceArray.length
    // and sentenceArray.length <2
    // then put remaining sentences with previous paragraph if it exists
    // return false
    if (
      paragraphLengths[i] > sentenceArray.length &&
      sentenceArray.length < 2
    ) {
      for (let l = sentenceArray.length; l > 0; l--) {
        tempString = tempString + sentenceArray.shift();
      }
      if (tempText.length) {
        tempText[tempText.length - 1] =
          tempText[tempText.length - 1] + tempString;
      } else {
        tempText.push(tempString);
      }
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

  setWords("");
  setText("");
  setLengths([]);
  setProgressParagraphs(100);
  setParagraphs(tempText); // text is an array where each element is a number of sentences comprising a paragraph

  setRenderParagraphs(true);
};
