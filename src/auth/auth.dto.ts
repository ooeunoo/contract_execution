import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { AuthProvider } from '../user/user.constant';
import { UserDTO } from '../user/user.dto';
import { User } from '../user/user.entity';
import { IUserSignIn } from './auth.interface';

export class SignInRequestDTO {
  @DataTransporter({
    doc: { description: '유저' },
  })
  public readonly user: User;
}

export class SignUpBodyDTO {
  @DataTransporter({
    doc: { description: '인증 프로바이더' },
    props: [IsEnum(AuthProvider)],
  })
  public readonly provider: AuthProvider;

  @DataTransporter({
    doc: { description: '이메일' },
    props: [IsString()],
  })
  public readonly email: string;

  @DataTransporter({
    doc: { description: '이름' },
    props: [IsString()],
  })
  public readonly name: string;

  @DataTransporter({
    doc: { description: '패스워드' },
    props: [IsString(), IsOptional()],
  })
  public readonly password?: string;
}

export class UserSignInDTO extends UserDTO {
  constructor(user: IUserSignIn) {
    super(user);

    Object.assign(this, {
      accessToken: user.accessToken,
    });
  }

  @DataTransporter({ doc: { description: '유저 엑세스 토큰' } })
  public readonly accessToken: string;
}
