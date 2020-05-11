import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginFormModule } from 'src/components/login-form/login-form.module';
import { LoginViewComponent } from './login-view.component';
import { LoginViewRoutingModule } from './login-routing.module';
@NgModule({
  declarations: [LoginViewComponent],
  imports: [CommonModule, LoginFormModule, LoginViewRoutingModule],
  exports: [],
  providers: [],
})
export class LoginViewModule {}
