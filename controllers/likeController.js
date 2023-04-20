import Like from '../models/like.js';
import Post from '../models/post.js';

import { authenticateToken } from '../utils/auth.js';
import { customError } from '../utils/error.js';

const getLikesCount = async (req, res, next) => {
  try {
    const count = await Like.countDocuments({ post: req.query.post });

    res.json({ data: count });
  } catch (err) {
    return next(err);
  }
};

const likePost = [
  authenticateToken,
  async (req, res, next) => {
    try {
      const user = req.user.id;
      const { post } = req.query.post;
  
      const likeExists = await Like.exists({ user, post });
  
      if (likeExists) throw customError(400, 'User has already liked this post.');
  
      const like = new Like({
        user,
        post,
      });
  
      await Promise.all([
        like.save(),
        Post.findByIdAndUpdate(post, { $inc: { likesCount: 1 } }),
      ]);
  
      res.json({
        data: like,
        message: 'Post liked by user successfully.',
      });
    } catch (err) {
      return next(err);
    }
  },
];

const unlikePost = [
  authenticateToken,
  async (req, res, next) => {
    try {
      const like = await Like.find({ user: req.user.id, post: req.query.post });

      await Promise.all([
        Like.deleteOne(like),
        Post.findByIdAndUpdate(req.query.post, { $inc: { likesCount: -1 } }),
      ]);
  
      res.json({
        date: like,
        message: 'Post unliked successfully.'
      });
    } catch (err) {
      return next(err);
    }
  },
];

export default {
  getLikesCount,
  likePost,
  unlikePost,
};