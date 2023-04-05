import Post from '../models/post.js';
import Comment from '../models/comment.js';

const listPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate('user');

    res.json({ data: { posts } });
  } catch (err) {
    return next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const [post, comments] = await Promise.all([
      Post.findById(req.params.postId).populate('user'),
      Comment.find({ postId: req.params.postId }).populate('user'),
    ]);

    res.json({ data: { post, comments } });
  } catch (err) {
    return next(err);
  }
};

const createPost = (req, res) => {
  res.send('TODO: Create post');
};

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
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
};