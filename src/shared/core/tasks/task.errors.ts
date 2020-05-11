import { ErrorInfo } from '../validation-error';

export const NOT_EDITABLE_TASK: ErrorInfo = {
  message: 'Finished task should not be edited',
  code: 'NOT_EDITABLE_TASK',
};

export const NOT_DELETABLE_TASK: ErrorInfo = {
  message: 'Finished task should not be removed',
  code: 'NOT_DELETABLE_TASK',
};

export const MISSING_TASK_DESCRIPTION: ErrorInfo = {
  message: 'Task must have a description',
  code: 'MISSING_TASK_DESCRIPTION',
};

export const MISSING_TASK_PERIOD: ErrorInfo = {
  message: 'Task must have a creation and finish date',
  code: 'MISSING_TASK_PERIOD',
};

export const MISSING_TASK_CREATION_DATE: ErrorInfo = {
  message: 'Task must have a creation date',
  code: 'MISSING_TASK_CREATION_DATE',
};

export const MISSING_TASK_FINISH_DATE: ErrorInfo = {
  message: 'Task must have a finish date',
  code: 'MISSING_TASK_FINISH_DATE',
};

export const WRONG_TASK_PERIOD_INTERVAL: ErrorInfo = {
  message: 'creation date should be lower than finish date',
  code: 'WRONG_TASK_PERIOD_INTERVAL',
};
