import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  author: { type: Schema.ObjectId, ref: 'User', required: true },
  post: { type: Schema.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true, minLength: 1 },
  createdAt: { type: Date, required: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;