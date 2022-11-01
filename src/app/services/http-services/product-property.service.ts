import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ProductProperty } from 'src/app/models';

@Injectable()
export class ProductPropertyService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(): Promise<ProductProperty[]> {
    let result$ = this.get<ProductProperty>(`product-properties/get`);
    return result$;
  }

  insert(row: ProductProperty): Promise<void> {
    let result$ = this.post<void>(`product-properties/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<ProductProperty>): Promise<void> {
    let result$ = this.put<void>(`product-properties/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`product-properties/delete/${key}`);
    return result$;
  }
}
