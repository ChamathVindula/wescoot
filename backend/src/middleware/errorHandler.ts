import { Request, Response, NextFunction } from 'express';
import { IGenericError } from '../types/errors';
import logger from '../utils/logger';

const errorHandler = (err: IGenericError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: statusCode,
    path: req.path,
  });

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
