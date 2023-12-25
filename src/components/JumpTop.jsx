import { useEffect } from "react";
import { FaChevronCircleUp } from "react-icons/fa";

const JumpTop = () => {
  const getYOffset = () => {
    const topButton = document.querySelector(".button-top");
    const height = window.innerHeight;
    if (window.scrollY > height) {
      topButton.classList.remove("hide");
    } else {
      topButton.classList.add("hide");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", getYOffset);
    return () => {
      window.removeEventListener("scroll", getYOffset);
    };
  }, []);
  return (
    <FaChevronCircleUp
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className="button-top hide"
    />
  );
};

export default JumpTop;
