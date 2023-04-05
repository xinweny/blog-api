import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { checkForValidationErrors, validateAndSanitizeUser } from '../utils/validators.js';

import User from '../models/user.js';

const register = [
  ...validateAndSanitizeUser(User),
  checkForValidationErrors,
  async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
    });

    await user.save();

    res.status(200).json({
      status: 200,
      message: 'User created successfully.',
    });
  }
];

const login = (req, res) => {
  passport.authenticate('local', { session: 'false' },
    (err, user, info) => {
      if (err || !user) return res.status(400).json({
        status: 400,
        message: info.message,
      });

      req.login(user, { session: 'false' }, err => {
        if (!user) return res.status(400).json({
          status: 400,
          message: err,
        });
      });

      const token = jwt.sign(
        user.toJSON(),
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' },
      );

      return res.json({ status: 200, user, token });
    }
  )(req, res);
};

const logout = (req, res) => {
  res.send('TODO: Implement logout');
};

export default {
  register,
  login,
  logout,
};