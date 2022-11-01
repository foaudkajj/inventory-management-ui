import { City } from './city.model';
import { Country } from './country.model';
import { Merchant } from './merchant.model';
import { Product } from './product.model';
import { Sale } from './sale.model';
import { User } from './user.model';

export class Branch {
  id: string;
  name: string;
  cityId: string;
  countryId: string;
  merchantId: string;
  city: City;
  country: Country;
  merchant: Merchant;
  users: User[];
  saleList: Sale[];
  productList: Product[];
}
