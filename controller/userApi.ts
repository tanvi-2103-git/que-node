import express from "express";
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import cors from "cors";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { validateLoginUser, validateRegisterUser } from "../middleware/validateUser";
import { User, UserModel } from "../mongoDBModel/User";
import { STATUS_CODES } from "http";
import multer from "multer";
import { getUserByEmailService, getUserByIdService } from "../service/userService";
export const userRoutes = express();
userRoutes.use(cors());

export const login = 
async (req: Request, res: Response) => {
     
    // const user: User | null = await User.findOne({ email: req.body.email });
    const emailId= req.body.email;
    const user = await getUserByEmailService(emailId);
  
    const { email, password } = req.body;
     if (user) {
       const matchPassword = await bcrypt.compare(password, user.password);
       console.log("password", password);
       console.log("user.password", user.password);
       
       console.log("matchPassword",matchPassword);
       
      if (email === user.email && matchPassword) {
        // Generate JWT token
        // const token = generateToken({ id: user._id, username: user.username });
        const token = jwt.sign({ id: user._id, password: user.password }, 'your-secret-key-here', {
          expiresIn: '2h',
        });
        res.json({
          statuscode: 200,
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
  }


  export const register = async (req: Request, res: Response) => {
    try {
      const { username, email, password, contactNumber, confirmPassword } = req.body;
      const hash = await bcrypt.hash(password, 10);
      
      const user = new UserModel({ username, email, password: hash, contactNumber , confirmPassword});
  
      const userData = await user.save();
      
      
      const token = jwt.sign({ id: userData._id, password: userData.password }, 'your-secret-key-here', {
        expiresIn: '2h',
      });
      res.status(201).json({ message: "User registered successfully",
        token: token,
        _id: user._id });
    } catch (error) {
      console.log(error);
  
      res.status(400).json({ error });
    }
  }


export const uploadpic = async (req: Request, res: Response) => {
  try {
    const user_id={_id: req.params.user_id};
    const image={profileImage:req.file?.buffer};
    // const user_id=new ObjectId(req.params.user_id);
    // const image=req.file?.buffer;
    
    // const result =  await uploadProfileImageService(user_id,image)
    const result =  await UserModel.updateOne(user_id,image);
    console.log(result);
    
    res.status(200).json({affectedRows:1})
    
  } catch (error) {
    console.log(error);

    // res.status(400).json({ error });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try{
       const user_id=req.params.user_id;
       console.log(user_id);
       
       const result = await getUserByIdService(user_id);
      // const result = await UserModel.findById({_id:user_id}).exec();
      console.log(result);
      
      res.status(200).json(result);
  }catch(error) {
    console.log(error);

    // res.status(400).json({ error });
  }
}