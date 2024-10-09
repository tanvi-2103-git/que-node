// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
export interface User extends Document {
  _id: string;
  username:string;
  email: string;
  password: string;
  contactNumber: number;
  confirmPassword: string;
  profileImage:string;
  
}
const userSchema = new mongoose.Schema({
    // _id: {type: Object},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String },
  confirmPassword: { type: String },
  profileImage: { type: String },
});

// Hash password before saving user
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);
export const User = mongoose.model('User', userSchema);
