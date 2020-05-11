import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';

const TOKEN_HEADER_KEY = 'Authorization';
const BEARER = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    return this.authService
      .getToken()
      .pipe(
        tap((token) => {
          if (token != null) {
            authReq = req.clone({
              headers: req.headers.set(TOKEN_HEADER_KEY, `${BEARER} ${token}`),
            });
          }
        }),
        mergeMap(() => next.handle(authReq))
      )
      .pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    this.alertService.push(err.message);
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/login`);
      return of(err.message);
    }
    return throwError(err);
  }
}
