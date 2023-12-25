import { useEffect } from "react";
import { FaChevronCircleUp } from "react-icons/fa";
import styled from "styled-components";

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
    <Wrapper>
      <FaChevronCircleUp
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        className="button-top hide"
      />
    </Wrapper>
  );
};

export default JumpTop;

const Wrapper = styled.div`
  .button-top {
    z-index: 99;
    position: fixed;
    top: 70vh;
    right: 0.5rem;
    color: rgba(240, 240, 240);
    background-color: var(--primary-500);
    border-radius: 50%;
    transition: all 0.3s linear;
    cursor: pointer;
    font-size: 3rem;
  }
  .hide {
    opacity: 0;
    z-index: -99;
  }
`;
