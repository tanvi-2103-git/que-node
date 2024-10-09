import { Request,Response, NextFunction } from 'express';
import Joi from 'joi'; // Import Joi for validation

import jwt from 'jsonwebtoken';
// const validateToken = (req:Request, res:Response, next:NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1]; // Bearer <token>
    
//     jwt.verify(token, 'yourSecretKey', (err, payload) => {
//       if (err) {
//         return res.status(403).json({
//           success: false,
//           message: 'Invalid token',
//         });
//       } else {
//         req.user = payload;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: 'Token is not provided',
//     });
//   }
// };

// Joi validation for user registration
export const validateRegisterUser = (req:Request, res:Response, next:NextFunction): void => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
     res.status(400).json({ error: error.details[0].message });
  }
else{
  next(); 
}
};

// Validation for login 
export const validateLoginUser = (req:Request, res:Response, next:NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    
     res.status(400).json({ error: error.details[0].message });
  }
  else{
  next(); 
  }
};

export const validateAddQuestionPaper = (req:Request, res:Response, next:NextFunction): void => {

    const questionSchema = Joi.object({
        question:Joi.string().required(),
  answer_type: Joi.string().required(),
  answer_choice: Joi.string().optional(),
  marks_alloted: Joi.number().integer().min(0).max(100).required(),
       
    });

    const schema = Joi.object({
        questions: Joi.array().items(questionSchema), // Include questions array
  sub_name: Joi.string().required(),
  createdAt: Joi.date().required(),
  user_id:Joi.string().required()
      
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
        console.log("error",error);
        
       res.status(400).json({ error: error.details[0].message });
    }
  else{
    next(); 
  }
  };

module.exports = { validateRegisterUser, validateLoginUser, validateAddQuestionPaper };