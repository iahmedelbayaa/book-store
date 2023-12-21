import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../services/user-service';
import dotenv from 'dotenv';
import  User  from '../model/user-model'; // adjust the path according to your project structure
dotenv.config();

export function generateToken(user: User) {
  try {
    const signOptions: jwt.SignOptions = { expiresIn: '3d' };
    const payload = { email: user.email };
    const token = jwt.sign(payload, process.env.SECRET as string, signOptions);
    return token;
    
  } catch (error) {
     throw new Error('Failed to generate token');
  }
  
}

//



export function refreshToken(user: User) {
  try {
    const signOptions: jwt.SignOptions = { expiresIn: '1y' };
    const payload = { email: user.email };
    const token = jwt.sign(payload, process.env.SECRET as string, signOptions);
    return token;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
}



export async function verifyAccessToken(
  accessToken: string
) {
  try {
    const payload: jwt.JwtPayload = jwt.verify(
      accessToken,
      process.env.SECRET!
    ) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    throw new Error('Failed ');
  }
}

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

    const payload: JwtPayload = jwt.verify(accessToken, process.env.SECRET as string) as JwtPayload;
  
    // get user from database by email

    const user: User = await getUserByEmail(payload.email);

     if (!user) {
       throw new Error('Unauthorized: user not found');
     }

    req.authenticatedUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not Authorized' });
  }
};
