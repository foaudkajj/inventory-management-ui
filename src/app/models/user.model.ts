import { Branch } from './branch.model';
import { UserStatus } from './enums';
import { Merchant } from './merchant.model';
import { Role } from './role.model';
import { Sale } from './sale.model';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  status: UserStatus;
  password: string;
  pictureUrl: string;
  email: string;
  gsm: string;
  salt: string;
  branchId: string;
  roleId: string;
  merchantId: string;
  branch: Branch;
  role: Role;
  merchant: Merchant;
  saleList: Sale[];
}
