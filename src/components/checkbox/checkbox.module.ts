import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [CheckboxComponent]
})
export class CheckboxModule {}
