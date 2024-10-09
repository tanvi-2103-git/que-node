// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
export interface User extends Document {
  _id: string;
  username:string;
  email: string;
  password: string;
  contactNumber: number;
  profileImage:string;
  
}
const userSchema = new mongoose.Schema({
    // _id: {type: Object},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String },
  profileImage: { type: String },
});

// Hash password before saving user


// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// module.exports = mongoose.model('User', userSchema);
export const User = mongoose.model('User', userSchema);
