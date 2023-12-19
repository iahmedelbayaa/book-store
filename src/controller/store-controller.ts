import { NextFunction, Request, Response } from 'express';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';
import { QueryResult } from '../util/QueryResult';

export const getStoreList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var getQuery = new queryList();
    var storeListQuery = getQuery.GET_STORE_LIST_QUERY;
    var result : any = await dbQuery(storeListQuery);

    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to list Store' });
  }
};

export const saveStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var createdBy = 'admin';
    var createdOn = new Date(Date.now()).toISOString();
    //req body
    var storeName = req.body.storeName;
    var storeCode = req.body.storeCode;
    var address = req.body.address;
    //check if is empty
    if (!storeName || !address) {
      return res.status(501).send({ error: 'empty' });
    }

    //get new class
    var saveQuery = new queryList();
    // params
    var values: any[] = [storeName, storeCode, address, createdOn, createdBy];
    var SaveStoreQuery = saveQuery.SAVE_STORE_QUERY;
    //await to execute database query
    await dbQuery(SaveStoreQuery, values);

    console.log(storeName, address);

    return res.status(201).send('Successfully store Created');
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to save Store' });
  }
};
