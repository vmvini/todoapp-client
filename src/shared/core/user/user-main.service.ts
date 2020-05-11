import { UserService } from './user.service';
import { UserRegisterData } from './user-register-data';
import { Observable } from 'rxjs';
import { User } from './user';
import { userRegisterDataValidator } from './user-validators';
import { mergeMap } from 'rxjs/operators';

export class UserMainService implements UserService {

  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  create(userData: UserRegisterData): Observable<User> {
    return this._validate(userData)
    .pipe(
      mergeMap(() => this.userService.create(userData))
    );
  }

  private _validate(userData: UserRegisterData): Observable<boolean> {
    return userRegisterDataValidator(userData);
  }
}
