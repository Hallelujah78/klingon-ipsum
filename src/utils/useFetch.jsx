import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "./utils";

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dictionary, setDictionary] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let dict = getLocalStorage("klingon");
      if (getLocalStorage("klingon")) {
        setDictionary(getLocalStorage("klingon"));
      } else {
        const response = await fetch(url);
        if (response.status >= 200 && response.status <= 299) {
          dict = await response.json();
          setDictionary(dict.klingon);
          setLocalStorage("klingon", dict.klingon);
        } else {
          console.log(response.text, response.statusText);
          setIsError(true);
        }
      }
      setIsLoading(false);
    };
    getData();
  }, [url]);

  return { isLoading, dictionary, isError };
};
