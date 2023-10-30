import PropTypes from "prop-types";

const Paragraph = ({ paragraph }) => {
  return <p>{paragraph}</p>;
};
export default Paragraph;

Paragraph.propTypes = {
  paragraph: PropTypes.arrayOf(PropTypes.string),
};
