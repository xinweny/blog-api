import Post from '../models/post.js';
import Comment from '../models/comment.js';
import Like from '../models/like.js';

import multer from '../config/multerConfig.js';
import { authenticateToken } from '../utils/auth.js';
import { validateAndSanitizePost, checkForValidationErrors } from '../utils/validators.js';
import { customError } from '../utils/error.js';
import { includeKeys, formatDataURI } from '../utils/helpers.js';
import upload from '../utils/cloudinary.js';

const getPosts = async (req, res, next) => {
  try {
    const findQuery = includeKeys(req.query, ['author', 'title', 'published']);
    const sortQuery = includeKeys(req.query, ['likesCount', 'commentsCount', 'createdAt', 'updatedAt']);

    const posts = await Post.find(findQuery)
      .find(req.query.tags
        ? { tags: { $all: req.query.tags.split(',') } }
        : {})
      .sort(sortQuery)
      .limit(req.query.limit ? Number(req.query.limit) : 100)
      .populate('author', 'username');

    res.json({ data: posts });
  } catch (err) {
    return next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    res.json({ data: post });
  } catch (err) {
    return next(err);
  }
};

const createPost = [
  multer.single('imgFile'),
  authenticateToken,
  ...validateAndSanitizePost(),
  checkForValidationErrors,
  async (req, res, next) => {
    try {
      let cloudRes;

      if (req.file) {
        cloudRes = await upload(formatDataURI(req.file.buffer, req.file.mimetype));
        console.log(cloudRes);
      }

      const post = new Post({
        author: req.user._id,
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags ? req.body.tags.split(' ') : [],
        published: req.body.published,
        imageUrl: req.file ? cloudRes.secure_url : null,
        createdAt: new Date(),
      });
  
      await post.save();
  
      res.json({
        data: post,
        message: 'Post created successfully.'
      });
    } catch (err) {
      return next(err);
    }
  },
];

const updatePost = [
  authenticateToken,
  ...validateAndSanitizePost(),
  checkForValidationErrors,
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (req.user.id !== post.author.toString()) throw customError(401, 'Unauthorized');

      req.body.tags = req.body.tags ? req.body.tags.split(' ') : [];

      const updateQuery = includeKeys(req.body, ['title', 'text', 'published', 'tags']);
  
      const updatedPost = await Post.findByIdAndUpdate(post.id, {
        $set: {
          ...updateQuery,
          updatedAt: new Date(),
        },
      }, { new: true });
  
      res.json({
        data: updatedPost,
        message: 'Post updated successfully.',
      });
    } catch (err) {
      return next(err);
    }
  },
];

const deletePost = [
  authenticateToken,
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (req.user.id !== post.author.toString()) throw customError(401, 'Unauthorized');
  
      await Promise.all([
        Post.deleteOne(post),
        Comment.deleteMany({ post: post._id }),
        Like.deleteMany({ post: post._id }),
      ]);
  
      res.json({
        data: post,
        message: 'Post successfully deleted.',
      });
    } catch (err) {
      return next(err);
    }
  },
];

export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};