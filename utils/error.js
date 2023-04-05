const customError = (statusCode, msg) => {
  const error = new Error(msg);
  error.status = statusCode;
  
  return error;
}

export {
  customError,
}