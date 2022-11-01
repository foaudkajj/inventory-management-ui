import { ProductTypeProperty } from "./product-type-property.model";

export class ProductProperty {
    id: string;
    type: string;
    translate: string;
    dataField: string;
    editorType: string;
    validation: string;
    formItemEditorOptions: string;
    gridColumnEditorOptions: string;
    gridColumnConf: string;
    productTypePropertyList: ProductTypeProperty[];
}
