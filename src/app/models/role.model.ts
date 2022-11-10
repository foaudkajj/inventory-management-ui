import { Merchant } from './merchant.model';
import { RolePermission } from './role-permission.model';

export class Role {
  id: string;
  name: string;
  merchantId: string;
  merchant: Merchant;
  rolePermissions: RolePermission[];
}
