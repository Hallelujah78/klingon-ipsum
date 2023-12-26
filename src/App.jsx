// react
import { useState, useRef, useEffect } from "react";

// libraries
import styled from "styled-components";

// utils
import { displayAlert } from "./utils/utils";
import { generateParagraphs } from "./utils/generateParagraphs.js";
import { generateSentenceLengths } from "./utils/generateSentenceLengths.js";
import { generatePunctuation } from "./utils/generatePunctuation.js";
import { generateWordArray } from "./utils/generateWordArray.js";
import { generateUuids } from "./utils/generateUuids.js";

// custom hooks
import { useFetch } from "./utils/useFetch";

// components
import Loading from "./components/Loading";
import Error from "./components/Error";
import Footer from "./components/Footer";
import JumpTop from "./components/JumpTop.jsx";

import "./styles/main.css";
import Paragraph from "./components/Paragraph";
import Progress from "./components/Progress.jsx";

// global variables
const url =
  "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon";

function App() {
  const inputRef = useRef(null);
  const alertRef = useRef(null);
  const [words, setWords] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const { isLoading, dictionary, isError } = useFetch(url);
  const [progress, setProgress] = useState(0);
  const [renderParagraphs, setRenderParagraphs] = useState(true);
  const [uuids, setUuids] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [progressText, setProgressText] = useState("");

  useEffect(() => {
    if (!isLoading && !isError) {
      inputRef.current.focus();
    }
  }, [isError, isLoading]);

  const handleClick = async () => {
    if (!parseInt(words) || parseInt(words) <= 0) {
      displayAlert(
        "please enter a positive number",
        "danger",
        alertRef.current
      );
      return;
    }
    setRenderParagraphs(false);
    setParagraphs(null);
    setUuids(null);

    setShowProgress(true);
    setProgressText("Generating random word list ");
    // words
    let wordArray = await generateWordArray(setProgress, dictionary, words);

    setProgress(0);
    setProgressText("Generating random sentence lengths ");
    // sentence lengths
    let lengthsArray = await generateSentenceLengths(setProgress, words);

    // punctuation
    setProgress(0);
    setProgressText("Generating punctuated text ");
    let punctuatedText = await generatePunctuation(
      setProgress,
      lengthsArray,
      wordArray
    );
    wordArray = null;

    // paragraphs
    setProgress(0);
    setProgressText("Generating paragraphs ");
    let paragraphs = await generateParagraphs(punctuatedText, setProgress);
    punctuatedText = null;

    // uuids
    const uuids = generateUuids(paragraphs);
    setUuids(uuids);
    setParagraphs(paragraphs);
    setProgress(0);

    if (paragraphs) {
      setShowProgress(false);
      setRenderParagraphs(true);
      displayAlert("Qapla' - Success!", "success", alertRef.current);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <section className="section-center">
          <Loading data-testid="spinner" />
        </section>
      </div>
    );
  } else if (isError) {
    return (
      <div className="app">
        <section className="section-center">
          <Error />
        </section>
      </div>
    );
  } else {
    return (
      <>
        <Wrapper className="app">
          <section className="section-center">
            <h1 data-test="app-title" className="title">
              Klingon Ipsum
            </h1>
            <p className="quote">
              Qo&apos;mey poSmoH Hol - language opens worlds
            </p>

            <input
              data-testid="number-input"
              placeholder="enter number of words"
              onChange={(e) => setWords(parseInt(e.target.value || ""))}
              value={words}
              type="number"
              ref={inputRef}
            />
            <button
              data-test-id="generate-button"
              className="btn"
              onClick={handleClick}
            >
              Dochvetlh vIneHb! - I want that thing!
            </button>
            <div data-testid="alert" ref={alertRef} className="alert"></div>
            <div className="progress">
              {showProgress ? (
                <Progress progress={progress} progressText={progressText} />
              ) : null}
            </div>
          </section>
          {renderParagraphs ? (
            <div className="text">
              {paragraphs.map((paragraph, index) => {
                return <Paragraph key={uuids[index]} paragraph={paragraph} />;
              })}
            </div>
          ) : null}
          <JumpTop />
        </Wrapper>
        <Footer />
      </>
    );
  }
}

export default App;

const Wrapper = styled.div``;
