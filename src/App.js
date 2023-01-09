import { useState, useRef, useEffect } from "react";
import { generateText, createParagraphs, displayAlert } from "./utils/utils";
import { useFetch } from "./utils/useFetch";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Footer } from "./components/Footer";
import "./styles/main.css";
const url =
  "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon";

function App() {
  const inputRef = useRef(null);
  const alertRef = useRef(null);
  const [words, setWords] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [text, setText] = useState("");
  const { isLoading, dictionary, isError } = useFetch(url);

  useEffect(() => {
    if (!isLoading && !isError) {
      inputRef.current.focus();
    }
  });

  const handleClick = () => {
    const text = generateText(dictionary, words);
    setText(text);
    const paragraphs = createParagraphs(text);
    setParagraphs(paragraphs);

    if (!parseInt(words) || parseInt(words) <= 0) {
      displayAlert(
        "please enter a positive number",
        "danger",
        alertRef.current
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <div className="app">
        <section className="section-center">
          <h1 className="title">Klingon Ipsum</h1>
          <p className="quote">Qo'mey poSmoH Hol - language opens worlds</p>

          <input
            placeholder="enter number of words"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            type="number"
            ref={inputRef}
          />
          <button className="btn" onClick={handleClick}>
            Dochvetlh vIneHb! - I want that thing!
          </button>
          <div ref={alertRef} className="alert"></div>
        </section>
        <div className="text">
          {paragraphs.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
