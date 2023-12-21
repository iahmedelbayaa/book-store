import { NextFunction, Request, Response } from 'express';

// import { Role } from '../enums/role-enum';
// import * as roleService from '../services/role-service';
// import ApiError from '../utils/api-error';

export function authorizeByRole(...allowedRoles: string[]) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.authenticatedUser;
      const isAuthorized: boolean = allowedRoles.findIndex(role=> role === user.role) !== -1;

      if (!isAuthorized) {
        throw new Error(
          'Forbidden: your role is not authorized to interact with this resource'
        );
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
}
