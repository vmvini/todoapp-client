import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskCreateFormComponent } from './task-create-form.component';

@NgModule({
  declarations: [TaskCreateFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [TaskCreateFormComponent],
  providers: [],
})
export class TaskCreateFormModule {}
