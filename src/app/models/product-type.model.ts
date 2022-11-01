import { ProductTypeProperty } from "./product-type-property.model";
import { Product } from "./product.model";

export class ProductType {
    id: string;
    name: string;
    productTypePropertyList: ProductTypeProperty[];
    products: Product[];
}
