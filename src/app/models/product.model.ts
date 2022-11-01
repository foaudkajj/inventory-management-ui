import { Branch } from './branch.model';
import { Color } from './color.model';
import { Merchant } from './merchant.model';
import { ProductType } from './product-type.model';
import { Unit } from './unit.model';

export class Product {
  id: string;
  name: string;
  barcode: string;
  code: string;
  gender: string;
  price: number;
  year: string;
  size: number;
  quantity: number;
  sellingPrice: number;
  merchantId: string;
  colorId: string;
  branchId: string;
  unitId: string;
  productTypeId: string;
  productType: ProductType;
  merchant: Merchant;
  color: Color;
  branch: Branch;
  unit: Unit;
}
