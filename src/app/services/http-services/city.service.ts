import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/app/models';

@Injectable()
export class CityService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(): Promise<City[]> {
    let result$ = this.get<City[]>(`cities/get`);
    return result$;
  }

  insert(row: City): Promise<void> {
    let result$ = this.post<void>(`cities/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<City>): Promise<void> {
    let result$ = this.put<void>(`cities/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`cities/delete/${key}`);
    return result$;
  }
}
