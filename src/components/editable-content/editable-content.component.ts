import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.scss'],
})
export class EditableContentComponent implements OnInit {
  public isEdit = false;
  public value;

  @Output()
  public saveEvent: EventEmitter<string>;

  @Input()
  public content: string;

  constructor() {
    this.saveEvent = new EventEmitter();
  }

  ngOnInit() {
    this.value = this.content;
  }

  public turnEditMode() {
    this.isEdit = true;
  }

  public save() {
    this.isEdit = false;
    this.saveEvent.emit(this.value);
  }
}
