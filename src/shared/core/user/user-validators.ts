import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ValidationError } from '../validation-error';
import { UserRegisterData } from './user-register-data';
import {
  INVALID_EMAIL,
  MISSING_CONFIRM_PASSWORD,
  MISSING_EMAIL,
  MISSING_NAME,
  MISSING_PASSWORD,
  PASSWORD_FORMAT,
  PASSWORD_MATCH_ERROR,
} from './user.errors';

const passwordRegex = /(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordFormat = (str: string): Observable<boolean> => {
  const regex = passwordRegex;
  if (regex.test(str)) {
    return of(true);
  }
  return throwError(new ValidationError(PASSWORD_FORMAT));
};

export const passwordMatchValidator = (str1: string, str2: string): Observable<boolean> => {
  if (str1 !== str2) {
    return throwError(new ValidationError(PASSWORD_MATCH_ERROR));
  }
  return of(true);
};

export const emailFormatValidator = (str: string): Observable<boolean> => {
  const regex = emailRegex;
  if (regex.test(str)) {
    return of(true);
  }
  return throwError(new ValidationError(INVALID_EMAIL));
};

export const userRegisterDataValidator = (userData: UserRegisterData): Observable<boolean> => {
  if (!userData.email) {
    return throwError(new ValidationError(MISSING_EMAIL));
  }
  if (!userData.name) {
    return throwError(new ValidationError(MISSING_NAME));
  }
  if (!userData.password) {
    return throwError(new ValidationError(MISSING_PASSWORD));
  }
  if (!userData.confirmPassword) {
    return throwError(new ValidationError(MISSING_CONFIRM_PASSWORD));
  }
  return emailFormatValidator(userData.email).pipe(
    mergeMap(() => passwordFormat(userData.password)),
    mergeMap(() =>
      passwordMatchValidator(userData.password, userData.confirmPassword)
    )
  );
};
