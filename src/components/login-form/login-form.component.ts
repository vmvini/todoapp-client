import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/validators/email.validator';

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public form: FormGroup;
  public submitted = false;

  @Output()
  public loginEvent: EventEmitter<LoginData>;

  constructor(private fb: FormBuilder) {
    this.loginEvent = new EventEmitter();
    this.form = this._getForm();
  }

  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loginEvent.emit(this.form.value);
    }
  }

  private _getForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.required, emailValidator()],
      password: ['', Validators.required],
    });
  }
}
