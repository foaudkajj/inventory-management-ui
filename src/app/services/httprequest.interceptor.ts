import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private _pendingRequests = 0;
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var headers = request.headers.set(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('Authorization')
    );
    const authReq = request.clone({ headers: headers });
    if (authReq.url.includes('/api/')) {
      if (this._pendingRequests === 0)
        // this.loadPnaelSerivce.postLoadingChanged(true);
        this._pendingRequests++;
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          sessionStorage.removeItem('Authorization');
          sessionStorage.removeItem('user');
          this.router.navigate(['/login-form']);
        } else {
          if (error.error) {
            this.toastService.showErrorMessage(error.error.Message);
          } else {
            this.toastService.showErrorMessage(error.message);
          }
        }
        return throwError(error);
      }),
      finalize(() => {
        if (authReq.url.includes('/api/')) {
          this._pendingRequests--;
        }
        if (this._pendingRequests === 0) {
          //   this.loadPnaelSerivce.postLoadingChanged(false);
        }
      })
    );
  }
}
