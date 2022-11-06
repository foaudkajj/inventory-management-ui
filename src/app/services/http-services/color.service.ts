import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Color } from 'src/app/models';

@Injectable()
export class ColorService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<Color[]> {
    let result$ = this.get<Color[]>(`colors/get`, options);
    return result$;
  }

  insert(row: Color): Promise<void> {
    let result$ = this.post<void>(`colors/insert`, row);
    return result$;
  }

  modify(key: string, row: Color): Promise<void> {
    let result$ = this.put<void>(`colors/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`colors/delete/${key}`);
    return result$;
  }
}
