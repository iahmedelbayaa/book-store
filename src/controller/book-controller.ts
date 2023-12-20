import { NextFunction, Request, Response } from 'express';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';
import loggerService from '../services/logger-service';
import { prepareAudit } from '../audit/audit-service';
import { actionList } from '../audit/audit-action';
import { dateFormat } from '../util/utility';
import { APIError } from '../error/api-error';
import { HttpStatusCode } from '../error/error-status';
import { ErrorType } from '../error/error-type';


const logger = new loggerService('book-controller');

export const getBookList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const auditOn = dateFormat();
  const getQuery = new queryList();
  const bookListQuery = getQuery.GET_BOOK_LIST_QUERY;

  try {
    console.log('bookListQuery:', bookListQuery);
    var result: any = await dbQuery(bookListQuery);
    logger.info('return Book list', result.rows);
    prepareAudit(
      actionList.GET_BOOK_LIST,
      {data: result.rows},
      null,
      'postman',
      auditOn
    );
    return res.status(200).json(result.rows);
  } catch (error : any) {
    console.error('Error', error);
    prepareAudit(
      actionList.GET_BOOK_LIST,
       {data :result.rows} ,
      {data :error.message},
      'postman',
      auditOn
    );
    return res.status(500).send({ error: 'Failed to list book' });
  }
};

export const getDetailsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = parseInt(req.params.bookId);
    // console.log("book Id :"+bookId);
    
    // validate not empty
    if (bookId === null  || isNaN(bookId)) {
      throw new APIError(
        ErrorType.API_ERROR,
        HttpStatusCode.INTERNAL_SERVER,
        'Invalid BookId , is not a number , bookId is :' + bookId,
        true
      );
    }
    const getQuery = new queryList();
    const bookDetailsQuery = getQuery.GET_BOOK_DETAILS_QUERY;
    const result: any = await dbQuery(bookDetailsQuery, [bookId]);
    const book = result.rows[0];
    if (! book ) {
      return res.status(404).send({ error: 'Book not found' });
    }
    return res.status(200).json(book);
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
    const createdBy = 'admin';
    const createdOn = new Date(Date.now()).toISOString();
    //req body
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const pages = req.body.pages;
    const storeCode = req.body.storeCode;
    //check if is empty
    if (!title || !author || !publisher || !storeCode) {
      return res.status(500).send({
        error:
          'title , author , publisher , storeCode are required , can not empty ',
      });
    }

    //get new class
    const saveQuery = new queryList();
    // params
    const values: any  = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdBy,
      createdOn,
    ];
    const SaveBookQuery = saveQuery.SAVE_BOOK_QUERY;
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
    const createdBy = 'admin';
    const createdOn = Date.now();
    //req body
    const bookId = req.body.bookId;
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const pages = req.body.pages;
    const storeCode = req.body.bookName;
    //check if is empty
    if (!bookId || !title || !author || !publisher || !storeCode) {
      return res.status(501).send({
        error:
          'book Id ,title , author , publisher , storeCode are required , can not empty ',
      });
    }

    //get new class
    const saveQuery = new queryList();
    // params
    const values: any = [
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
    const updateBookQuery = saveQuery.UPDATE_STORE_QUERY;
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
  const bookId = req.params.bookId;

  try {
    // validate not empty
    if (!bookId) {
      return res.status(500).send({ error: 'can not delete empty bookId' });
    }
    const deleteQuery = new queryList();
    const deleteBookQuery = deleteQuery.DELETE_BOOK_QUERY;
    await dbQuery(deleteBookQuery, [bookId]);

    return res.status(200).send('Successfully book deleted ');
  } catch (err) {
    console.log('Error : ' + err);
    return res
      .status(500)
      .send({ error: 'Failed to delete book with id : ' + bookId });
  }
};
