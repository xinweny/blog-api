import mongoose, { Schema } from 'mongoose';

const LikeSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.ObjectId, ref: 'Post', required: true },
});

const Like = mongoose.model('Like', LikeSchema);

export default Like;