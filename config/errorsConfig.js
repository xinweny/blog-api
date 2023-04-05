const handle404Error = app => {
  app.use((req, res, next) => {
    const err = new Error('Resource not found.');
    err.status = 404;
    next(err);
  });
}

const handleServerError = app => {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      error: { code: err.status, message: err.message },
    });
  });
};

export {
  handle404Error,
  handleServerError,
}