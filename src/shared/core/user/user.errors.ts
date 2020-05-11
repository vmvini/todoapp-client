import { ErrorInfo } from '../validation-error';

export const MISSING_EMAIL: ErrorInfo = {
  message: 'Email is missing',
  code: 'MISSING_EMAIL',
};

export const INVALID_EMAIL: ErrorInfo = {
  message: 'Email is invalid',
  code: 'INVALID_EMAIL',
};

export const MISSING_NAME: ErrorInfo = {
  message: 'Name is missing',
  code: 'MISSING_NAME',
};

export const MISSING_PASSWORD: ErrorInfo = {
  message: 'Password is missing',
  code: 'MISSING_PASSWORD',
};

export const MISSING_CONFIRM_PASSWORD: ErrorInfo = {
  message: 'Confirm password is missing',
  code: 'MISSING_CONFIRM_PASSWORD',
};

export const PASSWORD_MATCH_ERROR: ErrorInfo = {
  message: 'Passwords don\'t match',
  code: 'PASSWORD_MATCH_ERROR',
};

export const PASSWORD_FORMAT: ErrorInfo = {
  message: 'Password should have at least',
  code: 'PASSWORD_FORMAT',
};
