// react
import { useState, useRef, useEffect } from "react";

// libraries
import { v4 as uuidv4 } from "uuid";

// utils
import {
  generateText,
  createParagraphs,
  displayAlert,
  generateRandomNumber,
} from "./utils/utils";
import { useFetch } from "./utils/useFetch";

// data
import { klingonWords } from "./data/data";

// components
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Footer } from "./components/Footer";

import "./styles/main.css";
import Paragraph from "./components/Paragraph";

// global variables
const url =
  "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon";

function App() {
  // const inputRef = useRef(null);
  // const alertRef = useRef(null);
  const [words, setWords] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [text, setText] = useState("");
  const { isLoading, dictionary, isError } = useFetch(url);
  const [progress, setProgress] = useState(0);
  const [progressLengths, setProgressLengths] = useState(0);
  const [progressPunctuation, setProgressPunctuation] = useState(0);
  const [progressParagraphs, setProgressParagraphs] = useState(0);
  const [lengths, setLengths] = useState([]);
  const [renderParagraphs, setRenderParagraphs] = useState(true);

  const sentenceLength = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const paraLength = [5, 6, 7];

  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  const generateParagraphs = async () => {
    const textArray = [...text];
    const maxProgressParagraphs = 100;

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
    setProgressParagraphs(100);
    setParagraphs(tempText); // text is an array where each element is a number of sentences comprising a paragraph
    setRenderParagraphs(true);
  };

  const generateSentenceLengths = async () => {
    let start = performance.now();
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
    let end = performance.now();
    console.log(`execution time: ${end - start} ms`);
    setProgressLengths(100);

    setLengths(lengths);
  };
  // end of generate an array of sentence lengths

  const generatePunctuation = async () => {
    const tempLengths = [...lengths];
    const tempText = [...text];
    // start of adding punctuation
    const maxProgressPunctuation = 100;
    const puncStart = performance.now();
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
        const puncEnd = performance.now();
        console.log(`execution time: ${puncEnd - puncStart} ms`);
        setProgressPunctuation(100);
        setText(tempText);
        return;
      }

      // add a period where there was a space (spaces will always be in odd index positions)
      // with 5000 words, text is an array with 10000 elements, there is a space in between every word

      tempText[totalLength + tempLengths[i] * 2 - 1] = ". "; // index 9 = item 10
      totalLength = totalLength + tempLengths[i] * 2;
    }
    setText(tempText);
  };

  const generateWordArray = async () => {
    setRenderParagraphs(false);
    const start = performance.now();
    const dictionary = klingonWords;
    const maxProgress = 100;
    const batchSize = Math.floor(words / 100);

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

      //end of generating the text array

      if (i % batchSize === 0) {
        const newProgress = Math.floor((i / words) * maxProgress);
        setProgress(newProgress);
        setText(text);
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    const end = performance.now();
    console.log(`execution time: ${end - start} ms`);
    setProgress(100);
    setText(text);
  };

  const handleClickTwo = () => {
    const maxProgress = 100;
    const dictionary = klingonWords;
    const start = performance.now();
    let tempText = [];

    // generate the 'text' by adding words and punctuation to an array
    for (let i = 0; i < words; i++) {
      if (i !== words - 1 && i !== 0) {
        // it's not the first or last word
        tempText.push(" ");
        tempText.push(dictionary[generateRandomNumber(dictionary)]);
      } else if (i === 0) {
        // first word, don't add space
        tempText.push(dictionary[generateRandomNumber(dictionary)]);
      } else if (i === words - 1) {
        tempText.push(".");
        setProgress(100);
        let end = performance.now();
        console.log(`execution time: ${end - start} ms`);
        return;
      }

      // const newProgress = Math.floor((i / words) * maxProgress);
      // setProgress(newProgress);

      setTimeout(() => {
        const newProgress = Math.floor((i / words) * maxProgress);
        setProgress(newProgress);
      }, 1);
    }
    let end = performance.now();
    console.log(`execution time: ${end - start} ms`);
  };

  const handleClick = () => {
    const dictionary = klingonWords;
    const text = generateText(dictionary, words, setProgress);
    setText(text);
    const paragraphs = createParagraphs(text);
    setParagraphs(paragraphs);

    if (!parseInt(words) || parseInt(words) <= 0) {
      displayAlert(
        "please enter a positive number",
        "danger",
        alertRef.current
      );
    } else {
      displayAlert("Qapla' - Success!", "success", alertRef.current);
    }
  };

  return (
    <>
      <progress value={progress} max="100" />{" "}
      <button onClick={handleClickTwo}>Timeout</button>
      <button onClick={generateWordArray}>Promise</button>
      <p>Generating random word list: {progress}% Complete</p>
      <progress value={progressLengths} max="100" />
      <button onClick={generateSentenceLengths}>Promise</button>
      <p>Generating sentence lengths: {progressLengths}% Complete</p>
      <progress value={progressPunctuation} max="100" />
      <button onClick={generatePunctuation}>Promise</button>
      <p>Generating punctuation: {progressPunctuation}% Complete</p>
      <progress value={progressParagraphs} max="100" />
      <button onClick={() => generateParagraphs(text)}>Promise</button>
      <p>Generating paragraphs: {progressParagraphs}% Complete</p>
      <div className="app">
        <section className="section-center">
          <h1 className="title">Klingon Ipsum</h1>
          <p className="quote">Qo'mey poSmoH Hol - language opens worlds</p>

          <input
            placeholder="enter number of words"
            value={words}
            onChange={(e) => setWords(parseInt(e.target.value) || "")}
            type="number"
            // ref={inputRef}
          />
          <button className="btn" onClick={handleClick}>
            Dochvetlh vIneHb! - I want that thing!
          </button>
          <div
            // ref={alertRef}
            className="alert"
          ></div>
        </section>
        {renderParagraphs ? (
          <div className="text">
            {paragraphs.map((paragraph) => {
              return <Paragraph key={uuidv4()} paragraph={paragraph} />;
            })}
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default App;
