import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsViewComponent } from './projects-view.component';
import { ProjectCardModule } from 'src/components/project-card/project-card.module';
import { ProjectCreateFormModule } from 'src/components/project-create-form/project-create-form.module';
import { ProjectsViewRoutingModule } from './projects-routing.module';
import { ProjectServiceToken, ProjectHttpService } from './services/project-http.service';
import { HttpClient } from '@angular/common/http';
import { ProjectMainService } from 'src/shared/core/projects/project-main.service';
import { TaskHttpService, TaskServiceToken } from './services/task-http.service';
import { TaskMainService } from 'src/shared/core/tasks/task-main.service';

@NgModule({
  declarations: [ProjectsViewComponent],
  imports: [
    CommonModule,
    ProjectCardModule,
    ProjectCreateFormModule,
    ProjectsViewRoutingModule,
  ],
  exports: [],
  providers: [
    {
      provide: ProjectServiceToken,
      useFactory: getFullProjectService,
      deps: [
        HttpClient
      ]
    },
    {
      provide: TaskServiceToken,
      useFactory: getFullTaskService,
      deps: [
        HttpClient
      ]
    },
  ],
})
export class ProjectsModule {}

function getFullProjectService(httpClient: HttpClient) {
  const httpService = new ProjectHttpService(httpClient);
  const mainService = new ProjectMainService(httpService);
  return mainService;
}

function getFullTaskService(httpClient: HttpClient) {
  const httpService = new TaskHttpService(httpClient);
  const mainService = new TaskMainService(httpService);
  return mainService;
}
