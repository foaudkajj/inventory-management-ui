import { Branch } from './branch.model';
import { CustomerInfo } from './customer-info.model';
import { Merchant } from './merchant.model';
import { User } from './user.model';

export class Sale {
    id: string;
    date: Date;
    total: number;
    refundAmount: number;
    userId: string;
    merchantId: string;
    branchId: string;
    customerInfoId: string;
    user: User;
    merchant: Merchant;
    branch: Branch;
    customerInfo: CustomerInfo;
}

