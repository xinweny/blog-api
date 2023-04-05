import Like from '../models/like.js';

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
  
      await like.save();
  
      res.json({
        data: { like },
        message: 'Post liked by user successfully.',
      });
    } catch (err) {
      return next(err);
    }
  },
];

const unlikePost = (req, res) => {
  res.send('TODO: Implement unlike post');
};

export default {
  likePost,
  unlikePost,
};