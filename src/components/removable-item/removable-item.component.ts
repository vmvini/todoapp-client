import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-removable-item',
  templateUrl: './removable-item.component.html',
  styleUrls: ['./removable-item.component.scss'],
})
export class RemovableItemComponent {
  @Output()
  public removeEvent: EventEmitter<any>;

  constructor() {
    this.removeEvent = new EventEmitter();
  }

  public remove() {
    this.removeEvent.emit();
  }
}
