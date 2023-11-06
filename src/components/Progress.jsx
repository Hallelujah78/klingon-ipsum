import PropTypes from "prop-types";

const Progress = ({ progress, progressText }) => {
  return (
    <>
      <progress value={progress} max="100" />
      <p>
        {progressText} {progress}% Complete
      </p>
    </>
  );
};

export default Progress;

Progress.propTypes = {
  progress: PropTypes.number,
  progressText: PropTypes.string,
};
