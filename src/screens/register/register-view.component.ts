import { Component, Inject } from '@angular/core';
import { UserRegisterData } from 'src/shared/core/user/user-register-data';
import { UserService } from 'src/shared/core/user/user.service';
import { UserServiceToken } from './services/user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
})
export class RegisterViewComponent {

  constructor(
    @Inject(UserServiceToken) private userService: UserService,
    private router: Router
  ) {
  }

  public onCreateUser(user: UserRegisterData) {
    this.userService.create(user).subscribe(() => this.router.navigate(['login']));
  }
}
