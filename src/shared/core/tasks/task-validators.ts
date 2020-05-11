import { of, throwError } from 'rxjs';
import { ValidationError } from '../validation-error';
import {
  MISSING_TASK_CREATION_DATE,
  MISSING_TASK_DESCRIPTION,
  MISSING_TASK_FINISH_DATE,
  MISSING_TASK_PERIOD,
  WRONG_TASK_PERIOD_INTERVAL,
} from './task.errors';
import { Task } from './task';
import { Period } from './period';

export const dateRangeValidator = (creation: Date, finish: Date) => {
  if (creation > finish) {
    return throwError(new ValidationError(WRONG_TASK_PERIOD_INTERVAL));
  }
  return of(true);
};

export const periodValidator = (period: Period) => {
  if (!period) {
    return throwError(new ValidationError(MISSING_TASK_PERIOD));
  }
  if (!period.creation) {
    return throwError(new ValidationError(MISSING_TASK_CREATION_DATE));
  }
  if (!period.finish) {
    return throwError(new ValidationError(MISSING_TASK_FINISH_DATE));
  }
  return dateRangeValidator(period.creation, period.finish);
};

export const taskValidator = (task: Task) => {
  if (!task.description) {
    return throwError(new ValidationError(MISSING_TASK_DESCRIPTION));
  }
  return periodValidator(task.period);
};
