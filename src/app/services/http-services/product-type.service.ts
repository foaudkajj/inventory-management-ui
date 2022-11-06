import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AssignProperties, ProductType } from 'src/app/models';

@Injectable()
export class ProductTypeService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<ProductType[]> {
    let result$ = this.get<ProductType[]>(`product-types/get`, options);
    return result$;
  }

  insert(row: ProductType): Promise<void> {
    let result$ = this.post<void>(`product-types/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<ProductType>): Promise<void> {
    let result$ = this.put<void>(`product-types/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`product-types/delete/${key}`);
    return result$;
  }

  assignProperties(payload: AssignProperties) {
    let result$ = this.post<void>(`product-types/assign-properties`, payload);
    return result$;
  }
}
