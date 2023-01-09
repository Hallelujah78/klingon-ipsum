// takes a data structure like an array and generates a random number based on the structure's length - essentially generates a random index
export const generateRandomNumber = (dataStructure) => {
  return Math.floor(Math.random() * dataStructure.length);
};

export const generateText = (wordArray, wordCount) => {
  const sentenceLength = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  let text = [];

  // generate the 'text' by adding words and punctuation to an array
  for (let i = 0; i < wordCount; i++) {
    if (i === 0) {
      // first word, don't add space
      text.push(wordArray[generateRandomNumber(wordArray)]);
    }
    if (i === wordCount - 1) {
      text.push(".");
    } else {
      // it's not the first or last word
      text.push(" ");
      text.push(wordArray[generateRandomNumber(wordArray)]);
    }
  }

  //end of generating the text array

  // start of generate an array of sentence lengths
  const lengths = [];
  for (let i = 0; i <= wordCount / sentenceLength[0]; i++) {
    lengths.push(sentenceLength[generateRandomNumber(sentenceLength)]);
  }
  // end of generate an array of sentence lengths

  let totalLength = 0;

  lengths.every((length, index) => {
    let remainingLength = text.length - 1 - totalLength;

    // if remaining length of text array is less than or equal to current sentence length * 2 (allow for spaces), break
    if (remainingLength <= length * 2) {
      return false;
    }

    // add a period where there was a space (spaces will always be in odd index positions)
    text[totalLength + length * 2 - 1] = ". "; // index 9 = item 10
    totalLength = totalLength + length * 2;

    return true;
  });

  return text;
};

//end of generateText

//set local storage

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//get local storage

export const getLocalStorage = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  return value ? value : false;
};

// start of createParagraphs function

export const createParagraphs = (textArray) => {
  //our random paragraph lengths = number of sentences per paragraph
  const paraLength = [5, 6, 7];

  // turn our array of sentences into a string
  const string = textArray.join("");
  // split our string into an array of sentences and retain the full stops
  const sentenceArray = string.split(/(?<=\.)/);
  // number of sentences in our array
  const numSentences = sentenceArray.length;

  // start of generate an array of paragraph lengths
  const paragraphLengths = [];
  for (let i = 0; i <= numSentences / paraLength[0]; i++) {
    paragraphLengths.push(paraLength[generateRandomNumber(paraLength)]);
  }
  // end of generate an array of sentence lengths

  //
  const text = [];
  console.log(textArray);
  paragraphLengths.every((length) => {
    let tempString = "";

    //******** 1 - paragraph length is smaller than or equal to remaining number of sentences in our sentenceArray *******/
    // if length <= sentenceArray.length
    // then just shift lines from sentenceArray to create a paragraph
    if (length <= sentenceArray.length) {
      for (let i = length; i > 0; i--) {
        tempString = tempString + sentenceArray.shift();
      }
      text.push(tempString);

      return true;
    }

    //******** 2 - allow short paragraph lengths where remaining number of sentences is less than length but greater than or equal to 2 *******/
    // if length > sentenceArray.length AND sentenceArray.length >= 2
    // then just create a short paragraph and return false
    if (length > sentenceArray.length && sentenceArray.length >= 2) {
      for (let i = sentenceArray.length; i > 0; i--) {
        tempString = tempString + sentenceArray.shift();
      }

      text.push(tempString);
      return false;
    }

    //******** 3 - widowed lines - prevent paragraphs of less than two lines *******/
    // if length > sentenceArray.length
    // and sentenceArray.length <2
    // then put remaining sentences with previous paragraph if it exists
    // return false
    if (length > sentenceArray.length && sentenceArray.length < 2) {
      for (let i = sentenceArray.length; i > 0; i--) {
        tempString = tempString + sentenceArray.shift();
      }
      if (text.length) {
        text[text.length - 1] = text[text.length - 1] + tempString;
        return false;
      } else {
        text.push(tempString);
      }
    }
    //********* 0 - number of sentences generated is less than 2 ******/
  });
  return text; // text is an array where each element is a number of sentences comprising a paragraph
};

// display alert
export const displayAlert = (text, action, ref) => {
  ref.classList.add(`alert-${action}`);
  ref.textContent = text;

  //remove alert
  setTimeout(function () {
    ref.classList.remove(`alert-${action}`);
    ref.textContent = "";
  }, 3000);
};
