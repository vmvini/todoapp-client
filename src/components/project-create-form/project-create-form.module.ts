import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectCreateFormComponent } from './project-create-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectCreateFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ProjectCreateFormComponent],
  providers: [],
})
export class ProjectCreateFormModule {}
