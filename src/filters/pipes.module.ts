import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipe } from './array.filter';

@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule],
  providers: [],
  exports: [FilterPipe]
})
export class PipesModule {}
