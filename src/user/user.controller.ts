import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { APIControllerExport } from '../app/decorator/controller-export.decorator';
import { Exception } from '../app/exception/exception';
import { EXCEPTION_CODE } from '../app/exception/exception.constant';
import { IJWTGuardRequest } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ROUTE } from './user.constant';
import { UserDTO, UserQueryDTO } from './user.dto';
import { UserService } from './user.service';

@Controller(ROUTE.ROOT)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Get(ROUTE.PROFILE))
  async getProfile(@Request() req: IJWTGuardRequest) {
    return new UserDTO(req.user);
  }

  @APIControllerExport(Get())
  async findUser(@Query() query: UserQueryDTO) {
    const { provider, email } = query;

    const user = await this.userService.findOne({ provider, email });

    return user ? new UserDTO(user) : null;
  }
}
