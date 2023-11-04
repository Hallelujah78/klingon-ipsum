import { v4 as uuidv4 } from "uuid";

export const generateUuids = (paragraphs) => {
  const paragraphsLength = paragraphs.length;
  const uuids = new Array(paragraphsLength);
  for (let i = 0; i < paragraphsLength; i++) {
    uuids[i] = uuidv4();
  }
  return uuids;
};
