import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';

@Injectable()
export class UserService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<User[]> {
    let result$ = this.get<User[]>(`users/get`, options);
    return result$;
  }

  insert(row: User): Promise<void> {
    let result$ = this.post<void>(`users/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<User>): Promise<void> {
    let result$ = this.put<void>(`users/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`users/delete/${key}`);
    return result$;
  }
}
