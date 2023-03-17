import { ApplicationError } from '@/protocols';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response) {
  if (err.name === 'CannotEnrollBeforeStartDateError') {
    console.log("teste3");
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'ConflictError' || err.name === 'DuplicatedEmailError') {
    console.log("teste4");
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError') {
    console.log("teste5");
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    console.log("teste6");
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err.name);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
