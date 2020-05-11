import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUrl } from 'src/services/url.utils';
import { Project } from 'src/shared/core/projects/project';
import { ProjectService } from 'src/shared/core/projects/project.service';

export const ProjectServiceToken = new InjectionToken<ProjectService>(
  'ProjectService'
);

export class ProjectHttpService implements ProjectService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = getUrl(['projects']);
  }

  create(project: Project): Observable<Project> {
    return this.httpClient
      .post(this.url, project)
      .pipe(map((resp: any) => resp.data));
  }

  edit(project: Project): Observable<Project> {
    return this.httpClient.put(this.url, project).pipe(map((res: any) => res.data));
  }

  delete(project: Project): Observable<Project> {
    return this.httpClient
      .delete(getUrl(['projects', project._id]))
      .pipe(map((res) => project));
  }

  get(): Observable<Project[]> {
    return this.httpClient.get(this.url).pipe(map((res: any) => res.data));
  }
}
