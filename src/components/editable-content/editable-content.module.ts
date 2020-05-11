import { CommonModule } from '@angular/common';
import { EditableContentComponent } from './editable-content.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditableContentComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [EditableContentComponent]
})
export class EditableContentModule {}
