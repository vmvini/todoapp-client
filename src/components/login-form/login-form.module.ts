import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [LoginFormComponent],
  providers: [],
})
export class LoginFormModule {}
