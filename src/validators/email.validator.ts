import { FormControl } from '@angular/forms';
import {
  emailFormatValidator,
  passwordFormat,
  passwordMatchValidator,
} from 'src/shared/core/user/user-validators';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const emailValidator = () => {
  return (input: FormControl) => {
    return emailFormatValidator(input.value).pipe(
      map((valid) => (valid ? null : { email: true })),
      catchError((err) => {
        return of({ email: true });
      })
    );
  };
};

export const passwordValidator = () => {
  return (input: FormControl) => {
    return passwordFormat(input.value).pipe(
      map((valid) => (valid ? null : { password: true })),
      catchError((err) => {
        return of({ password: true });
      })
    );
  };
};

export const matchValidator = (inputName: string) => {
  return (input: FormControl) => {
    if (!input) {
      return of(null);
    }
    if (!input.parent) {
      return of(null);
    }
    return passwordMatchValidator(
      input.parent.get(inputName).value,
      input.value
    ).pipe(
      map((valid) => (valid ? null : { match: true })),
      catchError((err) => {
        return of({ match: true });
      })
    );
  };
};
