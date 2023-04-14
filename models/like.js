import mongoose, { Schema } from 'mongoose';

const LikeSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  post: { type: Schema.ObjectId, ref: 'Post', required: true },
});

const Like = mongoose.model('Like', LikeSchema);

export default Like;