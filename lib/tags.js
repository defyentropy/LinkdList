/**
 * Takes in a comma-separated list of tags and returns an array of tags
 */
export const tagsToArray = (tags) => {
  tags = tags
    .split(",")
    .map((tag) => tag.toLowerCase())
    .filter((tag, index, array) => {
      return array.indexOf(tag) === index;
    });

  return tags;
};

/**
 * Takes in array of tags and returns a comma-separated list
 */
export const tagsToString = (tags) => {
  return tags.reduce((prev, next) => prev + "," + next);
};
