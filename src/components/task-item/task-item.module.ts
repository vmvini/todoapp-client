import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditableContentModule } from '../editable-content/editable-content.module';
import { TaskItemComponent } from './task-item.component';
import { RemovableItemModule } from '../removable-item/removable-item.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [TaskItemComponent],
  imports: [
    CommonModule,
    EditableContentModule,
    RemovableItemModule,
    CheckboxModule,
    TooltipModule,
    MomentModule
  ],
  exports: [TaskItemComponent],
  providers: [],
})
export class TaskItemModule {}
