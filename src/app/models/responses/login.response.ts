import { UserStatus } from '../enums';

export class LoginResponse {
  token: string;
  username: string;
  status: UserStatus;
  firstName: string;
  lastName: string;
  role: string;
}
