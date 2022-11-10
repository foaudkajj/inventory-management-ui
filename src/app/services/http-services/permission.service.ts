import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Permission } from 'src/app/models';

@Injectable()
export class PermissionService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<Permission[]> {
    let result$ = this.get<Permission[]>(`permissions/get`, options);
    return result$;
  }

  insert(row: Permission): Promise<void> {
    let result$ = this.post<void>(`permissions/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<Permission>): Promise<void> {
    let result$ = this.put<void>(`permissions/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`permissions/delete/${key}`);
    return result$;
  }
}
