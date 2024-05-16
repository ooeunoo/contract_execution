import { IsEnum, IsString } from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { AuthProvider } from '../user/user.constant';
import { User } from '../user/user.entity';

export class UserProfileDTO {}

export class UserQueryDTO {
  @DataTransporter({
    doc: { description: '인증 프로바이더' },
    props: [IsEnum(AuthProvider)],
  })
  provider: AuthProvider;

  @DataTransporter({
    doc: { description: '이메일' },
    props: [IsString()],
  })
  email: string;
}

export class UserDTO {
  constructor(user: User) {
    Object.assign(this, {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      provider: user.provider,
    });
  }

  @DataTransporter({ doc: { description: '유저 아이디' } })
  public readonly id: number;

  @DataTransporter({ doc: { description: '유저 이메일' } })
  public readonly email: string;

  @DataTransporter({ doc: { description: '유저 이름' } })
  public readonly name: string;

  @DataTransporter({ doc: { description: '유저 이미지' } })
  public readonly image: string;

  @DataTransporter({ doc: { description: '유저 인증 프로바이더' } })
  public readonly provider: AuthProvider;
}
