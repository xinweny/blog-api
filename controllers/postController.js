import Post from '../models/post.js';

import { authenticateToken } from '../utils/auth.js';
import { validateAndSanitizePost, checkForValidationErrors } from '../utils/validators.js';

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});

    res.json({ data: { posts } });
  } catch (err) {
    return next(err);
  }
};

const getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });

    res.json({ data: { posts } });
  } catch (err) {
    return next(err);
  }
}; 

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    res.json({ data: { post } });
  } catch (err) {
    return next(err);
  }
};

const createPost = [
  authenticateToken,
  ...validateAndSanitizePost(),
  checkForValidationErrors,
  async (req, res, next) => {
    try {
      const post = new Post({
        userId: req.user._id,
        title: req.body.title,
        text: req.body.text,
        likesCount: 0,
        published: req.body.published,
        createdAt: new Date(),
      });
  
      await post.save();
  
      res.json({ data: post, message: 'Post created successfully.' });
    } catch (err) {
      return next(err);
    }
  },
];

const updatePost = (req, res) => {
  res.send('TODO: Update post');
};

const deletePost = (req, res) => {
  res.send('TODO: Delete post');
};

const getUserPosts = (req, res) => {
  res.send('TODO: Get posts by userID');
};

export default {
  getPosts,
  getPostsByUser,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
};