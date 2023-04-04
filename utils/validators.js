import { body, validationResult } from 'express-validator';

const checkIfExistsInDB = (collection, field) => {
  return async value => {
    const user = await collection.findOne({ [field]: value });

    if (user) return Promise.reject(`${field.charAt(0).toUpperCase() + field.slice(1)} is already in use.`);
  };
}

const trimAndEscape = field => body(field).trim().escape();

const validateAndSanitizeUser = userModel => [
  trimAndEscape('username')
    .custom(checkIfExistsInDB(userModel, 'username')),
  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail()
    .custom(checkIfExistsInDB(userModel, 'email')),
  body('password', 'Please enter password.').exists(),
  body('confirm_password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match.'),
];

const checkForValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const code = 400;

    res.status(code).json({
      error: {
        code,
        message: errors.array(),
      }
    });
  } else {
    next();
  }
}

export {
  checkForValidationErrors,
  validateAndSanitizeUser,
};