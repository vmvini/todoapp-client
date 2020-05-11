import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { UserMenuDropDownModule } from '../user-menu-dropdown/user-menu-dropdown.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, UserMenuDropDownModule],
  exports: [HeaderComponent],
  providers: [],
})
export class HeaderModule {}
