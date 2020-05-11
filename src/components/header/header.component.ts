import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/shared/core/user/user';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  public user: User;

  @Output()
  public logoutEvent: EventEmitter<any>;

  @Output()
  public signupEvent: EventEmitter<any>;

  @Output()
  public loginEvent: EventEmitter<any>;

  constructor() {
    this.logoutEvent = new EventEmitter();
    this.signupEvent = new EventEmitter();
    this.loginEvent = new EventEmitter();
  }

  public logout() {
    this.logoutEvent.emit();
  }

  public signup() {
    this.signupEvent.emit();
  }

  public login() {
    this.loginEvent.emit();
  }
}
