export enum EXCEPTION_LEVEL {
  NORMAL = 'NORMAL',
  PANIC = 'PANIC',
}

export enum EXCEPTION_CODE {
  ERR0001 = 'Internal server error',
  ERR0002 = 'Not found',
  ERR0003 = 'Validation error',
  ERR0005 = 'Access denied',
  ERR0006 = 'Invalid access token',

  ERR0100 = 'Not found user',
  ERR0101 = 'Not found network',
  ERR0102 = 'Not found contract execution data',
  ERR0103 = 'Not found multi transfer data',
}
