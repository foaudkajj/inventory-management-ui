import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Branch } from 'src/app/models';

@Injectable()
export class BranchService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getAll(options = {}): Promise<Branch[]> {
    let result$ = this.get<Branch[]>(`branches/get`, options);
    return result$;
  }

  insert(row: Branch): Promise<void> {
    let result$ = this.post<void>(`branches/insert`, row);
    return result$;
  }

  modify(key: string, row: Partial<Branch>): Promise<void> {
    let result$ = this.put<void>(`branches/update/${key}`, row);
    return result$;
  }

  remove(key: string): Promise<void> {
    let result$ = this.delete<void>(`branches/delete/${key}`);
    return result$;
  }
}
