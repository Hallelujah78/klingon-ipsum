// react
import PropTypes from "prop-types";

// libraries
import styled from "styled-components";

const Progress = ({ progress, progressText }) => {
  return (
    <Wrapper>
      <progress value={progress} max="100" />
      <p data-testid="progress-text">
        {progressText}: {progress}% complete
      </p>
    </Wrapper>
  );
};

export default Progress;

Progress.propTypes = {
  progress: PropTypes.number,
  progressText: PropTypes.string,
};

const Wrapper = styled.div`
  progress {
    width: 100%;
    height: 2.5rem;
  }
  p {
    text-align: center;
  }
`;
