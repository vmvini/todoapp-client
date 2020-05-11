import { Observable } from 'rxjs';
import { User } from './user';
import { UserRegisterData } from './user-register-data';

export interface UserService {
  create: (userData: UserRegisterData) => Observable<User>;
}
