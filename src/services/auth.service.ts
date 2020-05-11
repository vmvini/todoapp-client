import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from 'src/shared/core/user/user';
import { UserSessionService } from 'src/shared/core/user/user-session.service';
import { getUrl } from './url.utils';

const TOKEN_KEY = 'auth-token';
@Injectable()
export class AuthService implements UserSessionService {

  private userSubject = new BehaviorSubject(null);
  public user$;

  constructor(private httpClient: HttpClient) {
    this.user$ = this.userSubject.asObservable();
    this.getUser().subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(getUrl(['authenticate']), { email, password }).pipe(
      tap(resp => {
        this._setToken(resp.data);
        const user = jwt_decode(resp.data);
        this.userSubject.next(user);
      }),
    );
  }

  getToken(): Observable<string> {
    return of(localStorage.getItem(TOKEN_KEY));
  }

  getUser(): Observable<User> {
    return this.getToken()
    .pipe(
      map(token => jwt_decode(token)),
      catchError((err) => {
        return of(null);
      })
    );
  }

  logout(): Observable<any> {
    localStorage.clear();
    this.userSubject.next(null);
    return of(null);
  }

  private _setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

}
