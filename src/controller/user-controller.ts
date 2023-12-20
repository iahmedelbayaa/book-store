import { NextFunction, Request, Response } from 'express';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';
import loggerService from '../services/logger-service';
import { prepareAudit } from '../audit/audit-service';
import { actionList } from '../audit/audit-action';
import { dateFormat } from '../util/utility';
import * as validationUtil from '../util/validation';
import { APIError } from '../error/api-error';
import { HttpStatusCode } from '../error/error-status';
import { ErrorType } from '../error/error-type';
var bcrypt = require('bcryptjs');

const logger = new loggerService('user-controller');

export const getUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auditOn = dateFormat();
  const getQuery = new queryList();
  const userListQuery = getQuery.GET_USER_LIST_QUERY;

  try {
    console.log('userListQuery:', userListQuery);
    var result: any = await dbQuery(userListQuery);
    logger.info('return user list', result.rows);
    prepareAudit(
      actionList.GET_USER_LIST,
      { data: result.rows },
      null,
      'postman',
      auditOn
    );
    return res.status(200).json(result.rows);
  } catch (error: any) {
    console.error('Error', error);
    prepareAudit(
      actionList.GET_USER_LIST,
      { data: result.rows },
      { data: error.message },
      'postman',
      auditOn
    );
    return res.status(500).send({ error: 'Failed to list user' });
  }
};

export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var createdBy = 'admin';
    var createdOn = new Date(Date.now()).toISOString();
    //req body
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var fullName = req.body.fullName;
    var userTypeCode = req.body.userTypeCode;
    var groups = req.body.groups;

    //check if is empty
    if (
      !username ||
      !password ||
      !email ||
      !fullName ||
      !userTypeCode ||
      !groups
    ) {
      return res.status(500).send({
        error:
          'username , password , email , fullName, userTypeCode , groups are required , can not empty ',
      });
    }
    var saveQuery = new queryList();
    var isUserExistQuery = saveQuery.IS_USER_EXIST_QUERY;
    let result : any  =await dbQuery(isUserExistQuery, [username, email]);
    if (result.rows[0].count != '0') {
      return res.status(500).send({ error: 'User already Exists' });
    }
    if (!validationUtil.isValidEmail(email)) {
      return res.status(500).send({ error: 'Email is not valid' });
    }

    if (!validationUtil.isValidPassword(password)) {
      return res.status(500).send({ error: 'Password is not valid' });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    // params
    var values: any = [
      username,
      hashedPassword,
      email,
      fullName,
      userTypeCode,
      createdOn,
      createdBy,
    ];  
    let SaveUserQuery = saveQuery.SAVE_USER_QUERY;
    //await to execute database query
     await dbQuery(SaveUserQuery, values);

    return res.status(201).send('Successfully user Created');
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to save user' });
  }
};
