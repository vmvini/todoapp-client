import { Observable } from 'rxjs';
import { User } from './user';

export interface UserSessionService {
  login: (email: string, password: string) => Observable<User>;
  getToken: () => Observable<string>;
  getUser: () => Observable<User>;
  logout: () => Observable<any>;
}
