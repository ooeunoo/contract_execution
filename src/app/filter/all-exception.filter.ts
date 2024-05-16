import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CustomInternalServerException,
  CustomNotFoundException,
  Exception,
  CustomValidationException,
  CustomAccessDeniedException,
  CustomUnAuthorizedException,
} from '../exception/exception';
import { IExceptionResponse, IRequestAugmented } from '../app.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<IRequestAugmented>();

    let resData: Exception;

    switch (exception.constructor) {
      case Exception: {
        resData = exception as Exception;
        break;
      }
      case CustomValidationException: {
        resData = exception as CustomValidationException;
        break;
      }
      case CustomAccessDeniedException: {
        resData = exception as CustomAccessDeniedException;
        break;
      }
      case NotFoundException: {
        resData = new CustomNotFoundException();
        break;
      }
      case UnauthorizedException: {
        resData = new CustomUnAuthorizedException();
        break;
      }
      default: {
        resData = new CustomInternalServerException();
        break;
      }
    }

    /**
     * Winston Log
     */
    if (req.extras) {
      req.extras.setError(exception);
      req.extras.setErrorCode(exception, resData.code);
      req.extras.stopTimer();
    }

    const { success, message, code, data, statusCode } = resData.build;

    const form: IExceptionResponse = {
      success,
      code,
      message,
      data,
    };

    return res.status(statusCode).json(form);
  }
}
