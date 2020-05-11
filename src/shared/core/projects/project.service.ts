import { Project } from './project';
import { Observable } from 'rxjs';

export interface ProjectService {
  create: (project: Project) => Observable<Project>;
  edit: (project: Project) => Observable<Project>;
  delete: (project: Project) => Observable<Project>;
  get: () => Observable<Project[]>;
}
