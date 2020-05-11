import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/shared/core/user/user';

@Component({
  selector: 'app-user-menu-dropdown',
  templateUrl: './user-menu-dropdown.component.html',
  styleUrls: ['./user-menu-dropdown.component.scss'],
})
export class UserMenuDropdownComponent {

  @Input()
  public user: User;

  @Output()
  public logout: EventEmitter<any>;

  constructor() {
    this.logout = new EventEmitter();
  }

  public doLogout() {
    this.logout.emit();
  }
}
