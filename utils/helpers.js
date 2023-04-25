const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const includeKeys = (obj, incKeys) => {
  return Object.keys(obj)
    .filter(k => incKeys.includes(k))
    .reduce((o, k) => {
      o[k] = obj[k];
      return o;
    }, {});
};

const formatDataURI = (buffer, mimetype) => {
  const b64 = Buffer.from(buffer).toString('base64');
  const dataURI = `data:${mimetype};base64,${b64}`;
  return dataURI;
}

const getPublicId = url => url.split('/').slice(-1)[0].split('.')[0];

export {
  capitalize,
  includeKeys,
  formatDataURI,
  getPublicId,
}