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


const logger = new loggerService('login-controller');

export const getUserProfile = async (req: Request, res: Response) => {
const authenticatedUser = req.authenticatedUser;  try {
    return res.status(200).json(authenticatedUser);
  } catch (err) {
    console.error('Error : ' + err);
    return res.status(500).json({ error: 'Failed to get user' });
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
      const { username, password } = req.params;
      if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
      }
      const getQuery = new queryList();
      const signInQuery = getQuery.SIGN_IN_QUERY;
      const result: any = await dbQuery(signInQuery, [username]);
      let dbResponse = result.rows[0];
      if (!result.rows.length) {
        logger.info('user : [' + username + '] not Exists in database');

        //401 unauthorized
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      let isPasswordValid = validationUtil.comparePassword(
        password,
        dbResponse.password
      );
      if (!isPasswordValid) {
        logger.info('user : [' + username + '] password is invalid');
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // get user role
      // const userRoleQuery = getQuery.GET_USER_ROLE_QUERY;
      // const roleResult: any = await dbQuery(userRoleQuery, [dbResponse.user_id]);

      // use generateToken
      const token = jwtUtil.generateToken(dbResponse);
      logger.info('user : [' + username + '] successfully logged in');
      return res.status(200).json({ token: token });
    } catch (error) {
        
        logger.error("Error at signin function");
        return res.status(500).json({ error: 'Failed to signin' });
    }
    



}


export const getUserRoles = async (
 userId : string
) => {

    try {
        
    } catch (error) {
        
    }

};