import jwt from 'jsonwebtoken';
import { User } from '../mongoDBModel/User';

export const generateToken = (payload:any) => {
  const secretKey = 'yourSecretKey'; // Replace with your own secret key
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = {
  generateToken,
};