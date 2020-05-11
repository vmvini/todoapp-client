import { Component } from '@angular/core';
import { LoginData } from 'src/components/login-form/login-form.component';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  public onLogin(data: LoginData) {
    this.authService.login(data.email, data.password).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }

  public createAccount() {
    this.router.navigate(['register']);
  }
}
