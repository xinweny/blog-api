import Comment from '../models/comment.js';
import Post from '../models/post.js';

import { authenticateToken } from '../utils/auth.js';
import { validateAndSanitizeComment, checkForValidationErrors } from '../utils/validators.js';
import { includeKeys } from '../utils/helpers.js';
import { customError } from '../utils/error.js';

const getComments = async (req, res, next) => {
  try {
    const findQuery = includeKeys(req.query, ['author', 'post', 'text']);

    const sortQuery = includeKeys(req.query, ['createdAt']);

    let comments;

    if (req.query.showPost === 'true') {
      comments = await Comment
        .find(findQuery)
        .sort(sortQuery)
        .populate('author', 'username').populate('post', 'title');
    } else {
      comments = await Comment
        .find(findQuery)
        .sort(sortQuery)
        .populate('author', 'username');
    }

    res.json({ data: comments });
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
        author: req.user.id,
        post: req.query.post,
        text: req.body.text,
        createdAt: new Date,
      });

      await Promise.all([
        comment.save(),
        Post.findByIdAndUpdate(req.query.post, { $inc: { commentsCount: 1 } }),
      ]);

      res.status(200).json({
        data: comment,
        message: 'Comment created successfully.',
      });
    } catch (err) {
      return next(err);
    }
  },
];

const updateComment = [
  authenticateToken,
  ...validateAndSanitizeComment(),
  checkForValidationErrors,
  async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);

      if (req.user.id !== comment.author.toString()) throw customError(401, 'Unauthorized');

      const updateQuery = includeKeys(req.body, ['text']);
  
      const updatedComment = await Comment.findByIdAndUpdate(comment.id, {
        $set: {
          ...updateQuery,
          post: comment.post,
          author: req.user.id,
          updatedAt: new Date(),
        },
      }, { new: true });
  
      res.json({
        data: updatedComment,
        message: 'Comment updated successfully.',
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

      if (req.user.id !== comment.author.toString()) throw customError(401, 'Unauthorized');

      await Promise.all([
        comment.deleteOne(),
        Post.findByIdAndUpdate(req.query.postId, { $inc: { commentsCount: -1 } }),
      ]);

      res.json({
        data: comment,
        message: 'Comment successfully deleted.',
      });
    } catch (err) {
      return next(err);
    }
  }
];

export default {
  getComments,
  createComment,
  updateComment,
  deleteComment,
}