import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { isValidPassword, transformPassword } from '../app/util/crypto';
import { User } from '../user/user.entity';
import { AuthProvider } from '../user/user.constant';
import { IUserSignIn } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    provider: AuthProvider,
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOne({ provider, email });

    if (user) {
      if (provider == AuthProvider.LOCAL) {
        const validatePassword = await isValidPassword(password, user.password);
        if (validatePassword) {
          return user;
        } else {
          // password error
          return null;
        }
      }
      return user;
    }

    // not found user
    return null;
  }

  async signin(user: User): Promise<IUserSignIn> {
    const payload = { username: user.name, userId: user.id };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(
    provider: AuthProvider,
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const existUser = await this.userService.findOne({ provider, email });

    if (existUser) {
      // Error: Already exist name

      throw new Error('');
    }

    // 비밀번호 조건 확인

    let encryptPassword = null;
    if (provider == AuthProvider.LOCAL) {
      encryptPassword = await transformPassword(password);
    }

    const user = await this.userService.createOne(
      provider,
      email,
      name,
      encryptPassword,
    );

    return user;
  }
}
