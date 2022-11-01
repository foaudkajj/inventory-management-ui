import { Injectable } from '@angular/core';
import { SERVICES } from '../models';
import { BranchService } from './http-services/branch.service';
import { CityService } from './http-services/city.service';
import { ColorService } from './http-services/color.service';
import { CountryService } from './http-services/country.service';
import { PaymentMethodService } from './http-services/payment-method.service';
import { ProductPropertyService } from './http-services/product-property.service';
import { ProductTypeService } from './http-services/product-type.service';

@Injectable()
export class GetService {
  constructor(
    private colorService: ColorService,
    private paymentMethodService: PaymentMethodService,
    private branchService: BranchService,
    private productTypeService: ProductTypeService,
    private productPropertyService: ProductPropertyService,
    private countryService: CountryService,
    private cityService: CityService
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

      default:
        return undefined;
    }
  }
}
