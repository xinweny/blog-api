import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, minLength: 1 },
  username: { type: String, required: true, unique: true, minLength: 1 },
  password: { type: String, required: true, minLength: 1 },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: { type: Date, required: true },
});

const User = mongoose.model('User', UserSchema);

export default User;