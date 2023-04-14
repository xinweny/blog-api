const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const includeKeys = (obj, incKeys) => {
  return Object.keys(obj)
    .filter(k => incKeys.includes(k))
    .reduce((o, k) => {
      o[k] = obj[k];
      return o;
    }, {});
};

export {
  capitalize,
  includeKeys,
}