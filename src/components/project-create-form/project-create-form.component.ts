import { Component, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/shared/core/projects/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-create-form',
  templateUrl: './project-create-form.component.html',
  styleUrls: ['./project-create-form.component.html'],
})
export class ProjectCreateFormComponent {
  form: FormGroup;

  @Output()
  public createEvent: EventEmitter<Project>;

  constructor(private fb: FormBuilder) {
    this.createEvent = new EventEmitter();
    this.form = this._getForm();
  }

  public onSubmit() {
    if (this.form.valid) {
      this.createEvent.emit({
        name: this.form.get('name').value,
        tasks: [],
      });
    }
  }

  private _getForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }
}
