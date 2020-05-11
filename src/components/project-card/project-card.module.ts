import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectCardComponent } from './project-card.component';
import { EditableContentModule } from '../editable-content/editable-content.module';
import { TaskItemModule } from '../task-item/task-item.module';
import { PipesModule } from 'src/filters/pipes.module';
import { RemovableItemModule } from '../removable-item/removable-item.module';
import { TaskCreateFormModule } from '../task-create-form/task-create-form.module';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    EditableContentModule,
    TaskItemModule,
    PipesModule,
    RemovableItemModule,
    TaskCreateFormModule
  ],
  exports: [ProjectCardComponent],
  providers: [],
})
export class ProjectCardModule {}
