import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/models';

@Injectable()
export class CountryService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(): Promise<Country[]> {
    let result$ = this.get<Country>(`countries/get`);
    return result$;
  }

  insert(row: Country): Promise<void> {
    let result$ = this.post<void>(`countries/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<Country>): Promise<void> {
    let result$ = this.put<void>(`countries/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`countries/delete/${key}`);
    return result$;
  }
}
