import { customError } from '../utils/error.js';

const handleErrors = app => {
  app.use((req, res, next) => {
    next(customError(404, 'Resource not found.'));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      error: { code: err.status, message: err.message },
    });
  });
}

export default handleErrors;