import { Component } from '@angular/core';
import { User } from 'src/shared/core/user/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public currentUser: User;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  public signup() {
    this.router.navigate(['register']);
  }

  public login() {
    this.router.navigate(['login']);
  }
}
