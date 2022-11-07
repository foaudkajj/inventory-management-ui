import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/models';

@Injectable()
export class RoleService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<Role[]> {
    let result$ = this.get<Role[]>(`roles/get`, options);
    return result$;
  }

  insert(row: Role): Promise<void> {
    let result$ = this.post<void>(`roles/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<Role>): Promise<void> {
    let result$ = this.put<void>(`roles/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`roles/delete/${key}`);
    return result$;
  }
}
