import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import  User  from '../model/user-model'; // adjust the path according to your project structure
dotenv.config();

export function generateAccessToken(email: string) {
  try {
    const signOptions: jwt.SignOptions = { expiresIn: '3d' };
    const payload = { email: email };
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string,
      signOptions
    );
    return token;
    
  } catch (error) {
     throw new Error('Failed to generate token');
  }
  
}


export async function verifyAccessToken(accessToken: string) {
  try {
    const payload: jwt.JwtPayload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    throw new Error('Failed To verify Access Token');
  }
}




export function generateRefreshToken(email: string) {
  try {
    const signOptions: jwt.SignOptions = { expiresIn: '1y' };
    const payload = { email: email };
    const token = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      signOptions
    );
    return token;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
}


export async function verifyRefreshToken(refreshToken: string) {
  try {
    const payload: jwt.JwtPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    throw new Error('Failed To verify Refresh Token ');
  }
}
