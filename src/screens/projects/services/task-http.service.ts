import { TaskService } from 'src/shared/core/tasks/task.service';
import { Task } from 'src/shared/core/tasks/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getUrl } from 'src/services/url.utils';
import { map } from 'rxjs/operators';
import { InjectionToken } from '@angular/core';

export const TaskServiceToken = new InjectionToken<TaskService>('TaskService');

export class TaskHttpService implements TaskService {
  constructor(private httpClient: HttpClient) {}

  create(task: Task, projectId: string): Observable<Task> {
    return this.httpClient
      .post(this._url(projectId), task)
      .pipe(map((resp: any) => resp.data));
  }

  complete(task: Task, projectId: string): Observable<Task> {
    return this.edit(task, projectId);
  }

  edit(task: Task, projectId: string): Observable<Task> {
    return this.httpClient
      .put(this._url(projectId), task)
      .pipe(map((resp: any) => task));
  }

  delete(task: Task, projectId: string): Observable<Task> {
    const url = this._url(projectId) + '/' + task._id;
    return this.httpClient
      .delete(url)
      .pipe(map((resp: any) => task));
  }

  private _url(projectId: string) {
    return getUrl(['projects', projectId, 'tasks']);
  }
}
