import express from "express";


import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { validateLoginUser, validateRegisterUser } from "../middleware/validateUser";
import { User } from "../mongoDBModel/User";

export const userRoutes = express();


//login user
userRoutes.post("/login",validateLoginUser, async (req, res) => {
    const user: User | null = await User.findOne({ email: req.body.email });
  
    const { email, password } = req.body;
     if (user) {
       const matchPassword = await bcrypt.compare(password, user.password);
       console.log("password", password);
       console.log("user.password", user.password);
       
       console.log("matchPassword",matchPassword);
       
      if (email === user.email && matchPassword) {
        // Generate JWT token
        // const token = generateToken({ id: user._id, username: user.username });
        const token = jwt.sign({ id: user._id, username: user.username }, 'your-secret-key-here', {
          expiresIn: 200000,
        });
        res.json({
          
          success: true,
          message: "Authentication successful!",
          token: token,
          _id: user._id
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
    }
  });
  userRoutes.post("/register", validateRegisterUser, async (req, res) => {
    try {
      const { username, email, password, contactNumber, confirmPassword } = req.body;
      const hash = await bcrypt.hash(password, 10);

      const user = new User({ username, email, password: hash, contactNumber , confirmPassword});
  
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
  
      res.status(400).json({ error });
    }
  });

  module.exports = {userRoutes};