import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserCreateFormComponent } from './user-create-form.component';

@NgModule({
  declarations: [UserCreateFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [UserCreateFormComponent],
  providers: [],
})
export class UserCreateFormModule {}
