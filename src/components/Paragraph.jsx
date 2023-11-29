import PropTypes from "prop-types";

const Paragraph = ({ paragraph }) => {
  return <p data-testid="paragraph-component">{paragraph}</p>;
};
export default Paragraph;

Paragraph.propTypes = {
  paragraph: PropTypes.string,
};
