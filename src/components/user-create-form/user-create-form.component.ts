import { Component, Output, EventEmitter } from '@angular/core';
import { UserRegisterData } from 'src/shared/core/user/user-register-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, passwordValidator, matchValidator } from 'src/validators/email.validator';

@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss'],
})
export class UserCreateFormComponent {
  public form: FormGroup;

  public submitted = false;

  @Output()
  public createEvent: EventEmitter<UserRegisterData>;

  constructor(private fb: FormBuilder) {
    this.createEvent = new EventEmitter();
    this.form = this._getForm();
  }

  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.createEvent.emit(this.form.value);
    }
  }

  private _getForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.required, emailValidator()],
      password: ['', Validators.required, passwordValidator()],
      confirmPassword: ['', Validators.required, matchValidator('password')],
      name: ['', Validators.required],
    });
  }
}
