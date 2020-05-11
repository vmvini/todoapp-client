import { Task } from './task';
import { Observable } from 'rxjs';

export interface TaskService {
  create: (task: Task, projectId: string) => Observable<Task>;
  complete: (task: Task, projectId: string) => Observable<Task>;
  edit: (task: Task, projectId: string) => Observable<Task>;
  delete: (task: Task, projectId: string) => Observable<Task>;
}
