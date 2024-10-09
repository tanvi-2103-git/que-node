import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request,Response, NextFunction } from 'express';


export interface CustomRequest extends Request {
  token: string | JwtPayload;
 }
export const validateToken =async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 
    if (!token) {
      throw new Error();
    }
    else{
 
    const decoded = jwt.verify(token, 'your-secret-key-here');
    (req as CustomRequest).token = decoded;
 
    next();}
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
 };