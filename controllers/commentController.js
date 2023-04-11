import Comment from '../models/comment.js';

import { authenticateToken } from '../utils/auth.js';
import { validateAndSanitizeComment, checkForValidationErrors } from '../utils/validators.js';
import { customError } from '../utils/error.js';

const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });

    res.json({ data: { comments } });
  } catch (err) {
    return next(err);
  }
};

const getCommentsByUser = async (req, res, next) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId });

    res.json({ data: { comments } });
  } catch (err) {
    return next(err);
  }
};

const createComment = [
  authenticateToken,
  ...validateAndSanitizeComment(),
  checkForValidationErrors,
  async (req, res, next) => {
    try {
      const comment = new Comment({
        userId: req.user.id,
        postId: req.body.post_id,
        text: req.body.text,
        createdAt: new Date,
      });

      await comment.save();

      res.status(200).json({
        data: comment,
        message: 'Comment created successfully.',
      });
    } catch (err) {
      return next(err);
    }
  },
];

const deleteComment = [
  authenticateToken,
  async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);

      if (req.user.id !== comment.userId.toString()) throw customError(401, 'Unauthorized');

      await Comment.deleteOne(comment);

      res.json({
        data: { comment },
        message: 'Comment successfully deleted.',
      });
    } catch (err) {
      return next(err);
    }
  }
];

export default {
  getCommentsByPost,
  getCommentsByUser,
  createComment,
  deleteComment,
}