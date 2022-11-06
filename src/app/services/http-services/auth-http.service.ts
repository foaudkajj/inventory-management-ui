import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from 'src/app/models';

@Injectable()
export class AuthHttpService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  login(payload: LoginRequest): Promise<LoginResponse> {
    let result$ = this.post<LoginResponse>(`auth/login`, payload);
    return result$;
  }
}
