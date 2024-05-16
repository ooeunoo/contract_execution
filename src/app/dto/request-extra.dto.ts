import {
  IRequestAugmented,
  IRequestLocation,
  IUserAgentResult,
} from '../app.interface';
import { Exception } from '../exception/exception';

export class RequestExtraDTO {
  private success: boolean;
  private startTime: string;
  private endTime: string;
  private elapsedTime: number;
  private ip: string;
  private location: IRequestLocation;
  private userAgent: any; // hexlant node util
  private method: string;
  private url: string;
  private params: Record<string, any>;
  private query: Record<string, any>;
  private header: any;
  private body: any;
  private error: any;
  private errorCode: any;
  private errorMessage: any;
  private uaParser: any; // hexlant node util

  constructor(req: IRequestAugmented) {
    this.success = true;
    this.startTime = new Date().toISOString();
    this.endTime = null;
    this.elapsedTime = null;
    this.ip = '';
    this.location = {
      country: null,
      region: null,
      city: null,
      // timezone: DEFAULT_USER_TIMEZONE,
    };
    this.userAgent = {
      browser: null,
      os: null,
      device: null,
      engine: null,
      cpu: null,
    };
    this.method = req.method;
    this.url = null;
    this.params = {};
    this.query = req.query ? { ...req.query } : {};
    this.header = req.headers ? { ...req.headers } : {};
    this.body = req.body;

    this.error = null;
    this.errorCode = null;
    this.errorMessage = null;

    // this.uaParser = new UseragentParser();
  }

  setParams(value: Record<string, any>): void {
    this.params = value;
  }

  setSuccess(value: boolean): void {
    this.success = value;
  }

  getIp(): string {
    return this.ip;
  }

  setIp(value: string): void {
    const ipv4CompatiblePrefix = '::ffff:';
    this.ip = value.startsWith(ipv4CompatiblePrefix)
      ? value.replace(ipv4CompatiblePrefix, '')
      : value;
  }

  getLocation(): IRequestLocation {
    return this.location;
  }

  getUserAgent(): IUserAgentResult {
    return this.userAgent;
  }

  setUserAgent(req: IRequestAugmented): void {
    this.uaParser.setUA(req.headers['user-agent']);
    this.userAgent = this.uaParser.parse();
  }

  getMethod(): string {
    return this.method;
  }

  getUrl(): string {
    return this.url;
  }

  setUrl(req: IRequestAugmented): void {
    this.url = req.baseUrl;
  }

  setError(e: unknown): void {
    this.setSuccess(false);
    try {
      if (e instanceof Error) {
        this.error = JSON.stringify(e, this._errorToJSON);
      } else if (e) {
        this.error = e;
      }
    } catch (err) {}
  }

  setErrorCode(e: unknown, errorCode: string): void {
    try {
      this.errorCode = errorCode;
      this.errorMessage = e instanceof Exception ? (e as any).message : null;
    } catch (err) {}
  }

  stopTimer(): void {
    this.endTime = new Date().toISOString();
    this.elapsedTime =
      new Date(this.endTime).getTime() - new Date(this.startTime).getTime();
  }

  toLoggingObject(): any {
    const result = {
      success: this.success,
      startTime: this.startTime,
      endTime: this.endTime,
      elapsedTime: this.elapsedTime,
      ip: this.ip,
      // userAgent: this.getUserAgent(),
      location: this.getLocation(),
      method: this.method,
      url: this.url,
      params: this.params,
      query: this.query,
      header: this.header,
      body: this.body,
      error: this.error,
      errorCode: this.errorCode,
      errorMessage: this.errorMessage,
    };
    this._replaceSensitiveInformation(result);
    return result;
  }

  private _replaceSensitiveInformation(loggingObject: any): void {
    return;
  }

  private _replaceProperties(
    target: any,
    replaceKeys: string[],
    replacer: string,
  ): void {
    if (target) {
      const keys = Object.keys(target);
      const rKeys = replaceKeys.map((key) => key.toLowerCase());
      rKeys.forEach((rKey) => {
        keys.forEach((key) => {
          if (key.toLowerCase().indexOf(rKey) >= 0) {
            target[key] = replacer;
          }
        });
      });
    }
  }

  private _errorToJSON(key, value) {
    if (value instanceof Error) {
      const retVal = {};
      Object.getOwnPropertyNames(value).forEach((k) => {
        retVal[k] = value[k];
      });
      return retVal;
    }
    return value;
  }
}
