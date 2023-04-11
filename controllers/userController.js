import User from '../models/user.js';

import { authenticateToken } from '../utils/auth.js';
import { customError } from '../utils/error.js';

const getUsers = [
  authenticateToken,
  async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') throw customError(401, 'Unauthorized');

      const users = await User.find({}, '-password');

      res.json({ data: { users }});
    } catch (err) {
      return next(err);
    }
    
  },
];

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, '-password');

    res.json({ data: { user } });
  } catch (err) {
    return next(err);
  }
};

const updateUser = (req, res) => {
  res.send('TODO: Implement update user profile');
};

export default {
  getUsers,
  getUser,
  updateUser,
};