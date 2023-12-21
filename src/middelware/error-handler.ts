import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// import IResponseError from '../interfaces/error/response-error-interface';
// import ApiError from '../utils/api-error';
// import ResponseError from '../utils/response-error';

export async function handle(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  console.log('got Error' , error.message);
    return res.status(500).json({
        error: error.message,
  });
}
