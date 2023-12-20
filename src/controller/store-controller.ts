import { NextFunction, Request, Response } from 'express';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';

export const getStoreList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getQuery = new queryList();
    const storeListQuery = getQuery.GET_STORE_LIST_QUERY;
    const result : any = await dbQuery(storeListQuery);

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
    const createdBy = 'admin';
    const createdOn = new Date(Date.now()).toISOString();
    //req body
    const storeName = req.body.storeName;
    const storeCode = req.body.storeCode;
    const address = req.body.address;
    //check if is empty
    if (!storeName || !address) {
      return res.status(501).send({ error: 'empty' });
    }

    //get new class
    const saveQuery = new queryList();
    // params
    const values: any[] = [storeName, storeCode, address, createdOn, createdBy];
    const SaveStoreQuery = saveQuery.SAVE_STORE_QUERY;
    //await to execute database query
    await dbQuery(SaveStoreQuery, values);

    console.log(storeName, address);

    return res.status(201).send('Successfully store Created');
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to save Store' });
  }
};
