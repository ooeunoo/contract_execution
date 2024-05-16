import { User } from '../user/user.entity';

export interface IUserSignIn extends User {
  accessToken: string;
}

export interface IJWTGuardRequest extends Request {
  user: User;
}
