import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BaseService {
  constructor(public httpClient: HttpClient, private router: Router) {}

  setToken(options?: Object) {
    const auth_token = 'TOEKEEK'; //sessionStorage.getItem('Authorization');

    if (auth_token) {
      const headers = new Headers({
        Authorization: `Bearer ${auth_token}`,
      });

      if (!options) {
        options = { headers: headers };
      } else {
        options = { ...options, headers: headers };
      }
      return options;
    } else {
      this.router.navigate(['login']);
    }
    return options;
  }
  protected get<T>(url: string, options?: Object): Promise<T[]> {
    // options = this.setToken(options);
    console.log(options);
    return lastValueFrom(
      this.httpClient.get<T[]>(environment.apiUrl + url, options)
    );
  }
  protected post<T>(url: string, payload: any, options?: Object): Promise<T> {
    this.setToken(options);
    return lastValueFrom(
      this.httpClient.post<T>(environment.apiUrl + url, payload, options)
    );
  }
  protected put<T>(url: string, payload: any, options?: Object): Promise<T> {
    this.setToken(options);
    return lastValueFrom(
      this.httpClient.put<T>(environment.apiUrl + url, payload, options)
    );
  }
  protected delete<T>(url: string, options?: Object): Promise<T> {
    this.setToken(options);
    return lastValueFrom(
      this.httpClient.delete<T>(environment.apiUrl + url, options)
    );
  }
}
