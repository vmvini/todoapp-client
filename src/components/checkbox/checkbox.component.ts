import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input()
  public isChecked = false;

  @Output()
  public changeEvent: EventEmitter<boolean>;

  constructor() {
      this.changeEvent = new EventEmitter();
  }

  ngOnChanges(value) {
    console.log('value changes', value);
  }

  public checkValue() {
      this.changeEvent.emit(this.isChecked);
  }
}
