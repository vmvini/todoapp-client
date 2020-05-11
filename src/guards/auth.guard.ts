import { Injectable, Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserSessionService } from 'src/shared/core/user/user-session.service';
import { map } from 'rxjs/operators';
import { User } from 'src/shared/core/user/user';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(AuthService) private authService: UserSessionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getToken().pipe(
      map((token: string) => {
        if (token) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
