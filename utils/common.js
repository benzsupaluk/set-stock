// waiting for (ms) millisecond
export const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// turn key of object of array into lowercase and replaces any spaces with underscores
export const transformKeys = (arr) => {
  return arr.map((obj) => {
    const transformedObj = {};
    for (const key in obj) {
      const newKey = key.toLowerCase().replace(/\s+/g, "_");
      transformedObj[newKey] = obj[key];
    }
    return transformedObj;
  });
};

// format date: DD Month YYYY
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const capitalizeSentence = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => {
      return capitalizeFirstLetter(word);
    })
    .join(" ");
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
