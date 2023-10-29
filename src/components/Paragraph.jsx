import { v4 as uuidv4 } from "uuid";

const Paragraph = ({ paragraph }) => {
  return <p key={uuidv4()}>{paragraph}</p>;
};
export default Paragraph;
