import { HttpException, HttpStatus } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { DataTransporter } from '../decorator/dto-transporter.decorator';
import { EXCEPTION_CODE } from './exception.constant';

export class Exception extends HttpException {
  @Exclude() private readonly _success = false;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _code: string;
  @Exclude() private readonly _statusCode: HttpStatus;
  @Exclude() private readonly _data;

  constructor(
    message: EXCEPTION_CODE,
    statusCode = HttpStatus.BAD_REQUEST,
    options?: { data: any },
  ) {
    super(message, statusCode);
    this._message = message;
    this._statusCode = statusCode;
    this._code = Object.keys(EXCEPTION_CODE).find(
      (x) => EXCEPTION_CODE[x] == message,
    );
    this._data = options?.data;
  }

  get code() {
    return this._code;
  }

  @DataTransporter()
  get build(): {
    success: boolean;
    message: string;
    code: string;
    statusCode: HttpStatus;
    data?: any;
  } {
    return {
      success: this._success,
      message: this._message,
      code: this._code,
      statusCode: this._statusCode,
      data: this._data,
    };
  }
}

/**
 * 클라이언트 데이터 유효성
 */
export class CustomValidationException extends Exception {
  constructor(message: any | any[]) {
    super(EXCEPTION_CODE.ERR0003, HttpStatus.BAD_REQUEST, { data: message });
  }
}

/**
 * 인터널 서버
 */
export class CustomInternalServerException extends Exception {
  constructor() {
    super(EXCEPTION_CODE.ERR0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

/**
 * 낫 파운드
 */
export class CustomNotFoundException extends Exception {
  constructor() {
    super(EXCEPTION_CODE.ERR0002, HttpStatus.NOT_FOUND);
  }
}

/**
 * 접근 제한
 */
export class CustomAccessDeniedException extends Exception {
  constructor() {
    super(EXCEPTION_CODE.ERR0005, HttpStatus.FORBIDDEN);
  }
}

/**
 * 권한
 */
export class CustomUnAuthorizedException extends Exception {
  constructor() {
    super(EXCEPTION_CODE.ERR0006, HttpStatus.UNAUTHORIZED);
  }
}
