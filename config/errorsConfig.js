import { customError } from '../utils/error.js';

const create404Error = app => {
  app.use((req, res, next) => {
    next(customError(404, 'Resource not found.'));
  });
};

const handleErrors = app => {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      error: { code: err.status, message: err.message },
    });
  });
};

export {
  create404Error,
  handleErrors,
};