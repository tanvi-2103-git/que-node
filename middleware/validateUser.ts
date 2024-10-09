import { Request,Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRegisterUser = (req:Request, res:Response, next:NextFunction): void => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string()
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