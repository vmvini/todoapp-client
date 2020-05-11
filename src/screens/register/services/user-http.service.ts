import { UserService } from 'src/shared/core/user/user.service';
import { UserRegisterData } from 'src/shared/core/user/user-register-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getUrl } from 'src/services/url.utils';
import { User } from 'src/shared/core/user/user';
import { map } from 'rxjs/operators';
import { InjectionToken } from '@angular/core';

export const UserServiceToken = new InjectionToken<UserService>('UserService');

export class UserHttpService implements UserService {

    constructor(private httpClient: HttpClient) {}

    create(userData: UserRegisterData): Observable<User> {
      return this.httpClient.post(getUrl(['register']), userData)
      .pipe(
          map((resp: any) => resp.data)
      );
    }
}