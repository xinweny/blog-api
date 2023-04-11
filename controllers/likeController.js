import Like from '../models/like.js';
import Post from '../models/post.js';

import { authenticateToken } from '../utils/auth.js';
import { customError } from '../utils/error.js';

const likePost = [
  authenticateToken,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { postId } = req.params;
  
      const likeExists = await Like.exists({ userId, postId });
  
      if (likeExists) throw customError(400, 'User has already liked this post.');
  
      const like = new Like({
        userId,
        postId,
      });
  
      await Promise.all([
        like.save(),
        Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } }),
      ]);
  
      res.json({
        data: { like },
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
      const like = await Like.find({ userId: req.user.id, postId: req.params.postId });

      await Promise.all([
        Like.deleteOne(like),
        Post.findByIdAndUpdate(req.params.postId, { $inc: { likesCount: -1 } }),
      ]);
  
      res.json({
        date: { like },
        message: 'Post unliked successfully.'
      });
    } catch (err) {
      return next(err);
    }
  },
];

export default {
  likePost,
  unlikePost,
};