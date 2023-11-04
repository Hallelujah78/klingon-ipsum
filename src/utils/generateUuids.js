import { v4 as uuidv4 } from "uuid";

export const generateUuids = (paragraphs) => {
  const paragraphsLength = paragraphs.length;
  const uuids = [];
  for (let i = 0; i < paragraphsLength; i++) {
    uuids.push(uuidv4());
  }
  return uuids;
};
