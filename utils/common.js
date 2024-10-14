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
