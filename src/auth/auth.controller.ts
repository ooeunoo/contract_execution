import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ROUTE } from './auth.constant';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { SignInRequestDTO, SignUpBodyDTO, UserSignInDTO } from './auth.dto';
import { APIControllerExport } from '../app/decorator/controller-export.decorator';
import { Exception } from '../app/exception/exception';
import { EXCEPTION_CODE } from '../app/exception/exception.constant';
import { UserDTO } from '../user/user.dto';

@Controller(ROUTE.ROOT)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @APIControllerExport(Post(ROUTE.SIGN_IN))
  async signin(@Request() req: SignInRequestDTO) {
    const user = await this.authService.signin(req.user);

    return new UserSignInDTO(user);
  }

  @APIControllerExport(Post(ROUTE.SIGN_UP))
  async signup(@Body() body: SignUpBodyDTO) {
    const { provider, email, name, password } = body;

    const user = await this.authService.signup(provider, email, name, password);

    return new UserDTO(user);
  }
}
