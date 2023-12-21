import { NextFunction, Request, Response } from 'express';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';
import loggerService from '../services/logger-service';
import { prepareAudit } from '../audit/audit-service';
import { actionList } from '../audit/audit-action';
import { dateFormat } from '../util/utility';
import * as validationUtil from '../util/validation';
import bcrypt from 'bcryptjs';
import * as jwtUtil from '../util/jwtUtil';
import User from '../model/user-model';
import { isValidPassword } from '../util/validation';


const logger = new loggerService('login-controller');

export const getUserProfile = async (req: Request, res: Response , next:NextFunction) => {
  const authenticatedUser = req.authenticatedUser;
  try {
    return res.status(200).json(authenticatedUser);
  } catch (error) {
    console.error('Error : ' + error);
      return next(error);

  }
};

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => { 
    try {
      /**
       *  1- validate is not empty
       *  2- get user by username
       *  3- Compare password
       *  4- get user roles
       *  5- generate token
       */
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }
      const getQuery = new queryList();
      const signInQuery = getQuery.SIGN_IN_QUERY;
      console.log('before = ' );
      const result: any = await dbQuery(signInQuery, [email]);
      console.log('result = ' + result);
      
      let dbResponse : User= result.rows[0];
      if (!result.rows.length) {
        logger.info('user : [' + email + '] not Exists in database');

        //401 unauthorized
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      // let isPasswordValid = validationUtil.comparePassword(
      //   password,
      //   dbResponse.password!!
      // );

      let isValidPassword = password === dbResponse.password ? true : false;
      if (!isValidPassword) {
        logger.info('user : [' + email + '] password is invalid');
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // get user role
      // const userRoleQuery = getQuery.GET_USER_ROLE_QUERY;
      // const roleResult: any = await dbQuery(userRoleQuery, [dbResponse.user_id]);

      // use generateToken
      const accessToken  = jwtUtil.generateAccessToken(dbResponse.email);
      logger.info('user : [' + email + '] successfully logged in');
      return res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        
      logger.error("Error at signin function");
      return next(error)
    }
    



}


export const getUserRoles = async (
  userId: string
) => {
  try {
    const getQuery = new queryList();
    const userRoleQuery = getQuery.GET_USER_ROLE_QUERY;
    const roleResult: any = await dbQuery(userRoleQuery, [userId]);
    return roleResult.rows;
  } catch (err) {
    logger.error('Error : ' + err);
    throw err;
  }
        
}   