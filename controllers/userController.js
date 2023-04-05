import User from '../models/user.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');

    res.json({ data: { users }});
  } catch (err) {
    return next(err);
  }
  
};

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