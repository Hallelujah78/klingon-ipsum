export const generatePunctuation = async (
  setProgressPunctuation,
  lengths,
  text
) => {
  const tempLengths = [...lengths];
  const tempText = [...text];
  // start of adding punctuation
  const maxProgressPunctuation = 100;
  let totalLength = 0;
  const lengthsLength = tempLengths.length;
  const batchSizePunctuation = Math.floor(lengthsLength / 100);

  const textLength = tempText.length - 1;

  // add periods/full stops
  for (let i = 0; i < lengthsLength; i++) {
    if (i % batchSizePunctuation === 0) {
      const newProgress = Math.floor(
        (i / lengthsLength) * maxProgressPunctuation
      );

      setProgressPunctuation(newProgress);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    let remainingLength = textLength - totalLength;

    // if remaining length of text array is less than or equal to current sentence length * 2 (allow for spaces), break
    if (remainingLength <= tempLengths[i] * 2) {
      setProgressPunctuation(100);
      return tempText;
    }

    // add a period where there was a space (spaces will always be in odd index positions)
    // with 5000 words, text is an array with 10000 elements, there is a space in between every word

    tempText[totalLength + tempLengths[i] * 2 - 1] = ". "; // index 9 = item 10
    totalLength = totalLength + tempLengths[i] * 2;
  }
  setProgressPunctuation(100);
  return tempText;
};
