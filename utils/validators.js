import { body, validationResult } from 'express-validator';

import { capitalize } from './helpers.js';

const checkIfExistsInDB = (collection, field) => {
  return async value => {
    const user = await collection.findOne({ [field]: value });

    if (user) return Promise.reject(`${capitalize(field)} is already in use.`);
  };
}

const checkForValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      code: 400,
      errors: errors.array(),
      data: req.body,
    });

    return;
  }
  
  next();
}

const validateAndSanitizeUser = userModel => [
  body('username')
    .trim().isLength({ min: 1 }).withMessage(`${capitalize('username')} is required.`).escape()
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

const validateAndSanitizePost = () => [
  body('title')
    .isLength({ min: 1 }).withMessage(`${capitalize('title')} is required.`).escape(),
  body('text')
    .isLength({ min: 1 }).withMessage(`${capitalize('username')} is required.`).escape(),
  body('published')
    .isBoolean(),
]

const validateAndSanitizeComment = () => [
  body('text')
  .isLength({ min: 1 }).withMessage(`${capitalize('title')} is required.`).escape(),
];

export {
  checkForValidationErrors,
  validateAndSanitizeUser,
  validateAndSanitizePost,
  validateAndSanitizeComment,
};