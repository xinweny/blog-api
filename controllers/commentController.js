import Comment from '../models/comment.js';

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

const createComment = (req, res) => {
  res.send('TODO: Create new comment');
};

const deleteComment = (req, res) => {
  res.send('TODO: Delete comment');
};

export default {
  getCommentsByPost,
  getCommentsByUser,
  createComment,
  deleteComment,
}