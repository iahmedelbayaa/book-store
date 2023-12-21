import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../services/user-service';
import {verifyAccessToken} from '../util/jwtUtil'
import dotenv from 'dotenv';
import User from '../model/user-model'; // adjust the path according to your project structure
dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer')) {
      return res.status(401).json({ error: 'Token is not exist' });
    }
    const accessToken: string = token.slice(7);

    const payload: JwtPayload = await verifyAccessToken(accessToken) 

    // get user from database by email
    console.log ('payload' , payload.email)
    const user: User = await getUserByEmail(payload.email);
    if (!user) {
      throw new Error('Unauthorized: user not found');
    }

    req.authenticatedUser = user;
    console.log('user : ' , req.authenticatedUser)
    next();
  } catch (error) {
    return next(error)
  }
};
