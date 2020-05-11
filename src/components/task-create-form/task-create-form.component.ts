import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/shared/core/tasks/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Period } from 'src/shared/core/tasks/period';

@Component({
  selector: 'app-task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.scss'],
})
export class TaskCreateFormComponent {
  public form: FormGroup;
  public submitted = false;

  @Output()
  public createEvent: EventEmitter<Task>;

  constructor(private fb: FormBuilder) {
    this.createEvent = new EventEmitter();
    this.form = this._getForm();
  }

  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.createEvent.emit(this._getTask());
    }
  }

  private _getTask(): Task {
    const description = this.form.get('description').value;
    return {
      description,
      finished: false,
      period: this._getPeriod(),
    };
  }

  private _getPeriod(): Period {
    return {
      creation: this.form.get('startDate').value,
      finish: this.form.get('endDate').value,
    };
  }

  private _getForm(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      startDate: [new Date()],
      endDate: [null, Validators.required],
    });
  }
}
