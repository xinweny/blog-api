import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 1 },
  password: { type: String, required: true, minLength: 1 },
  createdAt: { type: Date, required: true },
});

const User = mongoose.model('User', UserSchema);

export default User;