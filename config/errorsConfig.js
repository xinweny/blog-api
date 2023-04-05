const handleErrors = app => {
  app.use((req, res, next) => {
    const err = new Error('Resource not found.');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      error: { code: err.status, message: err.message },
    });
  });
}

export default handleErrors;