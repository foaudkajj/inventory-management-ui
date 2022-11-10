import { Injectable } from '@angular/core';
import { SERVICES } from '../models';
import { BranchService } from './http-services/branch.service';
import { CityService } from './http-services/city.service';
import { ColorService } from './http-services/color.service';
import { CountryService } from './http-services/country.service';
import { MerchantService } from './http-services/merchant.service';
import { PaymentMethodService } from './http-services/payment-method.service';
import { PermissionService } from './http-services/permission.service';
import { ProductPropertyService } from './http-services/product-property.service';
import { ProductTypeService } from './http-services/product-type.service';
import { RoleService } from './http-services/role.service';
import { UserService } from './http-services/user.service';

@Injectable()
export class GetService {
  constructor(
    private colorService: ColorService,
    private paymentMethodService: PaymentMethodService,
    private branchService: BranchService,
    private productTypeService: ProductTypeService,
    private productPropertyService: ProductPropertyService,
    private countryService: CountryService,
    private cityService: CityService,
    private roleService: RoleService,
    private userService: UserService,
    private merchantService: MerchantService,
    private permissionService: PermissionService
  ) {}

  get(serviceName: SERVICES) {
    switch (serviceName) {
      case 'COLOR':
        return this.colorService;

      case 'PRODUCT_TYPE':
        return this.productTypeService;

      case 'PRODUCT_PROPERTY':
        return this.productPropertyService;

      case 'PAYMENT_METHOD':
        return this.paymentMethodService;

      case 'BRANCH':
        return this.branchService;

      case 'COUNTRY':
        return this.countryService;

      case 'CITY':
        return this.cityService;

      case 'ROLE':
        return this.roleService;

      case 'USER':
        return this.userService;

      case 'MERCHANT':
        return this.merchantService;

      case 'PERMISSION':
        return this.permissionService;

      default:
        return undefined;
    }
  }
}
