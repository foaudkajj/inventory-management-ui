import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Merchant } from 'src/app/models';

@Injectable()
export class MerchantService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<Merchant[]> {
    let result$ = this.get<Merchant[]>(`merchants/get`, options);
    return result$;
  }

  insert(row: Merchant): Promise<void> {
    let result$ = this.post<void>(`merchants/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<Merchant>): Promise<void> {
    let result$ = this.put<void>(`merchants/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`merchants/delete/${key}`);
    return result$;
  }
}
