import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from 'src/app/models';

@Injectable()
export class PaymentMethodService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(): Promise<PaymentMethod[]> {
    let result$ = this.get<PaymentMethod>(`payment-methods/get`);
    return result$;
  }

  insert(row: PaymentMethod): Promise<void> {
    let result$ = this.post<void>(`payment-methods/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<PaymentMethod>): Promise<void> {
    let result$ = this.put<void>(`payment-methods/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`payment-methods/delete/${key}`);
    return result$;
  }
}
