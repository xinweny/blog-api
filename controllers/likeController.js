import Like from '../models/like.js';
import Post from '../models/post.js';

import { authenticateToken } from '../utils/auth.js';
import { includeKeys } from '../utils/helpers.js';
import { customError } from '../utils/error.js';

const getLikes = async (req, res, next) => {
  try {
    const findQuery = includeKeys(req.query, ['user', 'post']);

    if (req.query.count === 'true') {
      const count = await Like.countDocuments(findQuery);

      res.json({ data: count });
    } else {
      const likes = await Like.find(findQuery);

      res.json({ data: likes });
    }
  } catch (err) {
    return next(err);
  }
};

const likePost = [
  authenticateToken,
  async (req, res, next) => {
    try {
      const user = req.user.id;
      const { post } = req.body;
  
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
      await Promise.all([
        Like.findOneAndDelete({ user: req.user.id, post: req.body.post }),
        Post.findByIdAndUpdate(req.body.post, { $inc: { likesCount: -1 } }),
      ]);
  
      res.json({
        message: 'Post unliked successfully.'
      });
    } catch (err) {
      return next(err);
    }
  },
];

export default {
  getLikes,
  likePost,
  unlikePost,
};