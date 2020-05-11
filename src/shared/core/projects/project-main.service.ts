import { ProjectService } from './project.service';
import { Project } from './project';
import { Observable } from 'rxjs';
import { projectValidator } from './project-validators';
import { mergeMap } from 'rxjs/operators';

export class ProjectMainService implements ProjectService {
  private projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  create(project: Project): Observable<Project> {
    return projectValidator(project).pipe(
      mergeMap(() => this.projectService.create(project))
    );
  }

  edit(project: Project): Observable<Project> {
    return projectValidator(project).pipe(
      mergeMap(() => this.projectService.edit(project))
    );
  }

  delete(project: Project): Observable<Project> {
    return projectValidator(project).pipe(
      mergeMap(() => this.projectService.delete(project))
    );
  }

  get(): Observable<Project[]> {
    return this.projectService.get();
  }
}
