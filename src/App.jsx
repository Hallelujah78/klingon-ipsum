// react
import { useState, useRef, useEffect } from "react";

// libraries
import { v4 as uuidv4 } from "uuid";

// utils
import { displayAlert } from "./utils/utils";
import { generateParagraphs } from "./utils/generateParagraphs.js";
import { generateSentenceLengths } from "./utils/generateSentenceLengths.js";
import { generatePunctuation } from "./utils/generatePunctuation.js";
import { generateWordArray } from "./utils/generateWordArray.js";

// custom hooks
import { useFetch } from "./utils/useFetch";

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
  const inputRef = useRef(null);
  const alertRef = useRef(null);
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

  useEffect(() => {
    if (!isLoading && !isError) {
      inputRef.current.focus();
    }
  }, []);

  const paragraphHandler = async (text, setProgressParagraphs) => {
    const arrayOfParagraphs = await generateParagraphs(
      text,
      setProgressParagraphs
    );
    setParagraphs(arrayOfParagraphs);
    setRenderParagraphs(true);
  };

  const sentenceLengthHandler = async (setProgressLengths, words) => {
    const sentenceLengths = await generateSentenceLengths(
      setProgressLengths,
      words
    );
    setLengths(sentenceLengths);
  };

  const punctuationHandler = async (setProgressPunctuation, lengths, text) => {
    const punctuatedText = await generatePunctuation(
      setProgressPunctuation,
      lengths,
      text
    );
    setText(punctuatedText);
  };

  const wordHandler = async (setProgress, dictionary, words) => {
    setRenderParagraphs(false);
    const wordArray = await generateWordArray(setProgress, dictionary, words);
    setText(wordArray);
  };

  const handleClick = async () => {
    setRenderParagraphs(false);
    setLengths([]);
    setText("");
    setParagraphs([]);
    // words
    const wordArray = await generateWordArray(setProgress, dictionary, words);

    // sentence lengths
    const lengthsArray = await generateSentenceLengths(
      setProgressLengths,
      words
    );

    // punctuation
    const punctuatedText = await generatePunctuation(
      setProgressPunctuation,
      lengthsArray,
      wordArray
    );

    // paragraphs
    const paragraphs = await generateParagraphs(
      punctuatedText,
      setProgressParagraphs
    );
    setParagraphs(paragraphs);
    setRenderParagraphs(true);

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
      <progress value={progress} max="100" />
      <p>Generating random word list: {progress}% Complete</p>
      <progress value={progressLengths} max="100" />

      <p>Generating sentence lengths: {progressLengths}% Complete</p>
      <progress value={progressPunctuation} max="100" />
      <p>Generating punctuation: {progressPunctuation}% Complete</p>
      <progress value={progressParagraphs} max="100" />
      <p>Generating paragraphs: {progressParagraphs}% Complete</p>
      <div className="app">
        <section className="section-center">
          <h1 className="title">Klingon Ipsum</h1>
          <p className="quote">Qo'mey poSmoH Hol - language opens worlds</p>

          <input
            placeholder="enter number of words"
            onChange={(e) => setWords(parseInt(e.target.value || ""))}
            value={words}
            type="number"
            ref={inputRef}
          />
          <button className="btn" onClick={handleClick}>
            Dochvetlh vIneHb! - I want that thing!
          </button>
          <div ref={alertRef} className="alert"></div>
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
