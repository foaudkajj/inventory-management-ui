import { ProductProperty } from "./product-property.model";
import { ProductType } from "./product-type.model";

export class ProductTypeProperty {
  id: string;
  productTypeId: string;
  productPropertyId: string;
  productType: ProductType;
  productProperty: ProductProperty;
}
