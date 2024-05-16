import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Exception } from '../../app/exception/exception';
import { EXCEPTION_CODE } from '../../app/exception/exception.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const { provider, email, password } = req.body;
    const user = await this.authService.validateUser(provider, email, password);

    if (!user) {
      throw new Exception(EXCEPTION_CODE.ERR0100, HttpStatus.BAD_REQUEST);
    }

    req.user = user;

    return user;
  }
}
