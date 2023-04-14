import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minLength: 1 },
  text: { type: String, required: true, minLength: 1 },
  likesCount: { type: Number, required: true, default: 0 },
  commentsCount: { type: Number, required: true, default: 0 },
  tags: [String],
  published: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;