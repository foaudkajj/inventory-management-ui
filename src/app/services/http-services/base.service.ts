import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BaseService {
  constructor(public httpClient: HttpClient, private router: Router) {}

  protected get<T>(url: string, options?: Object): Promise<T> {
    return lastValueFrom(
      this.httpClient.get<T>(environment.apiUrl + url, options)
    );
  }
  protected post<T>(url: string, payload: any, options?: Object): Promise<T> {
    payload.merchantId = '1a871d90-8718-4de7-96e4-e6feae2ee6ef';
    return lastValueFrom(
      this.httpClient.post<T>(environment.apiUrl + url, payload, options)
    );
  }
  protected put<T>(url: string, payload: any, options?: Object): Promise<T> {
    return lastValueFrom(
      this.httpClient.put<T>(environment.apiUrl + url, payload, options)
    );
  }
  protected delete<T>(url: string, options?: Object): Promise<T> {
    return lastValueFrom(
      this.httpClient.delete<T>(environment.apiUrl + url, options)
    );
  }
}
