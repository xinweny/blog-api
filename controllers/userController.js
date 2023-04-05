import User from '../models/user.js';

const getUsers = (req, res) => {
  res.send('TODO: Implement list users');
};

const getUser = async (req, res, next) => {
  res.send('TODO: Implement get user profile');
};

const updateUser = (req, res) => {
  res.send('TODO: Implement update user profile');
};

export default {
  getUsers,
  getUser,
  updateUser,
};