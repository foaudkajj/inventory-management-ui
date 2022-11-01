import { Merchant } from './merchant.model';

export class Role {
  id: string;
  name: string;
  merchantId: string;
  merchant: Merchant;
}
