import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RemovableItemComponent } from './removable-item.component';

@NgModule({
  declarations: [RemovableItemComponent],
  imports: [CommonModule],
  exports: [RemovableItemComponent],
  providers: [],
})
export class RemovableItemModule {}
