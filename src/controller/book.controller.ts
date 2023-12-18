import { NextFunction, Request, Response } from 'express';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';
import { QueryResult } from '../util/QueryResult';
import loggerService from '../services/logger-service';
import { prepareAudit } from '../audit/audit-service';
import { actionList } from '../audit/audit-action';

const logger = new loggerService('book-controller');

export const getBookList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var getQuery = new queryList();
    var bookListQuery = getQuery.GET_BOOK_LIST_QUERY;

    var result = (await dbQuery(bookListQuery)) as QueryResult;
    logger.info('return Book list', result.rows);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to list book' });
  }
};

export const getDetailsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var bookId = req.params.bookId;
    var getQuery = new queryList();
    var bookDetailsQuery = getQuery.GET_BOOK_DETAILS_QUERY;
    var result = (await dbQuery(bookDetailsQuery, [bookId])) as QueryResult;
    return res.status(200).send(JSON.stringify(result.rows[0]));
  } catch (error) {
    logger.error('Failed to get Book details ', JSON.stringify(error));
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to list book' });
  }
};

export const saveBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var createdBy = 'admin';
    var createdOn = Date.now();
    //req body
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var pages = req.body.pages;
    var storeCode = req.body.bookName;
    //check if is empty
    if (!title || !author || !publisher || !storeCode) {
      return res.status(501).send({
        error:
          'title , author , publisher , storeCode are required , can not empty ',
      });
    }

    //get new class
    var saveQuery = new queryList();
    // params
    var values: any[] = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdOn,
      createdBy,
    ];
    var SaveBookQuery = saveQuery.SAVE_STORE_QUERY;
    //await to execute database query
    await dbQuery(SaveBookQuery, values);

    return res.status(201).send('Successfully book Created');
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to save book' });
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var createdBy = 'admin';
    var createdOn = Date.now();
    //req body
    var bookId = req.body.bookId;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var pages = req.body.pages;
    var storeCode = req.body.bookName;
    //check if is empty
    if (!bookId || !title || !author || !publisher || !storeCode) {
      return res.status(501).send({
        error:
          'book Id ,title , author , publisher , storeCode are required , can not empty ',
      });
    }

    //get new class
    var saveQuery = new queryList();
    // params
    var values: any[] = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdOn,
      createdBy,
      bookId,
    ];
    var updateBookQuery = saveQuery.UPDATE_STORE_QUERY;
    //await to execute database query
    await dbQuery(updateBookQuery, values);

    return res.status(201).send('Successfully book Update' + title);
  } catch (error) {
    console.log('Error' + error);
    return res.status(500).send({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var bookId = req.params.bookId;

  try {
    // validate not empty
    if (!bookId) {
      return res.status(500).send({ error: 'can not delete empty bookId' });
    }
    var deleteQuery = new queryList();
    var deleteBookQuery = deleteQuery.DELETE_BOOK_QUERY;
    await dbQuery(deleteBookQuery, [bookId]);

    return res.status(200).send('Successfully book deleted ');
  } catch (err) {
    console.log('Error : ' + err);
    return res
      .status(500)
      .send({ error: 'Failed to delete book with id : ' + bookId });
  }
};
