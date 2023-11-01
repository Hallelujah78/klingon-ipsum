import React, { useState } from "react";
import { generateRandomNumber } from "../utils/utils";
import { useFetch } from "../utils/useFetch";

const url =
  "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon";

const Progress = ({ words, setText }) => {
  const { isLoading, dictionary, isError } = useFetch(url);
  const [progress, setProgress] = useState(0);

  const maxProgress = 100; // Set your maximum progress value here
  const sentenceLength = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  // 2,147,483,647
  // 100 million seems like a fair limit to set

  const createArrayWithDelay = () => {
    const batchSize = Math.floor(words / 10); // Number of items processed in each batch
    let currentIndex = 0;

    const createArrayBatch = () => {
      for (let i = 0; i < batchSize; i++) {
        // Your array creation logic here

        let text = [];

        // generate the 'text' by adding words and punctuation to an array
        for (let i = 0; i < words; i++) {
          if (i === 0) {
            // first word, don't add space
            text.push(dictionary[generateRandomNumber(dictionary)]);
          }
          if (i === words - 1) {
            text.push(".");
          } else {
            // it's not the first or last word
            text.push(" ");
            text.push(dictionary[generateRandomNumber(dictionary)]);
          }
        }

        //end of generating the text array

        // start of generate an array of sentence lengths
        const lengths = [];
        for (let i = 0; i <= words / sentenceLength[0]; i++) {
          lengths.push(sentenceLength[generateRandomNumber(sentenceLength)]);
        }
        // end of generate an array of sentence lengths

        let totalLength = 0;

        lengths.every((length) => {
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

        // end of array creation logic

        currentIndex++;

        if (currentIndex >= words) {
          // If the array is complete, update progress to 100%
          setProgress(100);
          setText(text);
          return;
        }
      }

      // Update progress based on the current index
      const newProgress = Math.floor((currentIndex / words) * maxProgress);
      setProgress(newProgress);

      // Continue creating the array in the next animation frame
      setTimeout(() => {
        createArrayBatch();
      }, 0);

      // requestAnimationFrame(createArrayBatch);
    };

    // Start creating the array in the next animation frame
    requestAnimationFrame(createArrayBatch);
  };

  return (
    <div>
      {/* Button to trigger the code */}
      <button
        onClick={() => {
          createArrayWithDelay();
        }}
      >
        Start Process
      </button>

      {/* Your progress bar component */}
      <progress value={progress} max={maxProgress} />
      <p>{progress}% Complete</p>
    </div>
  );
};

export default Progress;
