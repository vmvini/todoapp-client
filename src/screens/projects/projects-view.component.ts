import { Component, Inject } from '@angular/core';
import { Project } from 'src/shared/core/projects/project';
import {
  ProjectEvent,
  ProjectTaskEvent,
  UPDATE_PROJECT_EVENT,
  DELETE_PROJECT_EVENT,
} from 'src/components/project-card/project-card.component';
import { Observable, throwError, of } from 'rxjs';
import {
  REMOVE_TASK_EVENT,
  UPDATE_TASK_EVENT,
  COMPLETE_TASK_EVENT,
} from 'src/components/task-item/task-item.component';
import { Task } from 'src/shared/core/tasks/task';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/shared/core/user/user';
import { ProjectService } from 'src/shared/core/projects/project.service';
import { ProjectServiceToken } from './services/project-http.service';
import { TaskService } from 'src/shared/core/tasks/task.service';
import { TaskServiceToken } from './services/task-http.service';

@Component({
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss'],
})
export class ProjectsViewComponent {
  public projects: Project[] = [];

  constructor(
    private authService: AuthService,
    @Inject(ProjectServiceToken) private projectService: ProjectService,
    @Inject(TaskServiceToken) private taskService: TaskService
  ) {
    this.projectService.get().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  public onProjectEvent(event: ProjectEvent) {
    switch (event.type) {
      case UPDATE_PROJECT_EVENT:
        return this.projectService.edit(event.project).subscribe((project) => {
          event.onSuccess(project);
        });
      case DELETE_PROJECT_EVENT:
        return this.projectService.delete(event.project).subscribe(() => {
          this.projects = this.projects.filter(
            (p) => p._id !== event.project._id
          );
        });
    }
  }

  public onProjectTaskEvent(event: ProjectTaskEvent) {
    switch (event.taskEvent.type) {
      case REMOVE_TASK_EVENT:
        return this.taskService
          .delete(event.taskEvent.task, event.project._id)
          .subscribe(() => {
            event.onSuccess(event.taskEvent.task);
          });
      case UPDATE_TASK_EVENT:
        return this.taskService
          .edit(event.taskEvent.task, event.project._id)
          .subscribe((task) => {
            event.onSuccess(task);
          });
      case COMPLETE_TASK_EVENT:
        return this.taskService
          .complete(event.taskEvent.task, event.project._id)
          .pipe(
            catchError((e) => {
              event.onError();
              return throwError(e);
            })
          )
          .subscribe((task) => {
            event.onSuccess(task);
          });
    }
  }

  public onCreateProject(project: Project) {
    this.projectService.create(project).subscribe((newProject) => {
      this.projects.push(newProject);
    });
  }
}
