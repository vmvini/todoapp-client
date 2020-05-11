import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ValidationError } from '../validation-error';
import { Task } from './task';
import { NOT_DELETABLE_TASK, NOT_EDITABLE_TASK } from './task.errors';
import { TaskService } from './task.service';
import { taskValidator } from './task-validators';

export class TaskMainService implements TaskService {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  create(task: Task, projectId: string): Observable<Task> {
    return this._validate(task).pipe(
      mergeMap(() => this.taskService.create(task, projectId))
    );
  }

  complete(task: Task, projectId: string): Observable<Task> {
    task.finished = true;
    return this._validate(task).pipe(
      mergeMap(() => this.taskService.edit(task, projectId))
    );
  }

  edit(task: Task, projectId: string): Observable<Task> {
    if (task.finished) {
      return throwError(new ValidationError(NOT_EDITABLE_TASK));
    }
    return this._validate(task).pipe(
      mergeMap(() => this.taskService.edit(task, projectId))
    );
  }

  delete(task: Task, projectId: string): Observable<Task> {
    if (task.finished) {
      return throwError(new ValidationError(NOT_DELETABLE_TASK));
    }
    return this.taskService.delete(task, projectId);
  }

  private _validate(task: Task): Observable<boolean> {
    return taskValidator(task);
  }
}
