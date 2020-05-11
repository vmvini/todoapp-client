import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/shared/core/projects/project';
import {
  TaskEvent,
  REMOVE_TASK_EVENT,
  UPDATE_TASK_EVENT,
  COMPLETE_TASK_EVENT,
} from '../task-item/task-item.component';
import { Task } from 'src/shared/core/tasks/task';

export const DELETE_PROJECT_EVENT = 'DELETE_PROJECT_EVENT';
export const UPDATE_PROJECT_EVENT = 'UPDATE_PROJECT_EVENT';
export interface ProjectEvent {
  type: string;
  project: Project;
  onSuccess: (project: Project) => void;
}

export interface ProjectTaskEvent {
  project: Project;
  taskEvent: TaskEvent;
  onSuccess: (task: Task) => void;
  onError: () => void;
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input()
  public project: Project;

  @Output()
  public projectEvent: EventEmitter<ProjectEvent>;

  @Output()
  public projectTaskEvent: EventEmitter<ProjectTaskEvent>;

  constructor() {
    this.projectEvent = new EventEmitter();
    this.projectTaskEvent = new EventEmitter();
  }

  public saveContent(projectName: string) {
    this.projectEvent.emit({
      type: UPDATE_PROJECT_EVENT,
      project: Object.assign({}, this.project, { name: projectName }),
      onSuccess: (project: Project) => this._updateProject(project),
    });
  }

  public onTaskEvent(taskEvent: TaskEvent) {
    let onSuccess;
    switch (taskEvent.type) {
      case REMOVE_TASK_EVENT:
        onSuccess = () => {
          this.project.tasks = this.project.tasks.filter(
            (t) => t._id !== taskEvent.task._id
          );
        };
        break;
      case COMPLETE_TASK_EVENT:
        onSuccess = (task) => {
          this.project.tasks = [ ...this.project.tasks.filter(
            (t) => t._id !== taskEvent.task._id
          ), task];
        };
        break;
      default:
        onSuccess = (task: Task) => taskEvent.onSuccess(task);
    }

    this.projectTaskEvent.emit({
      project: this.project,
      taskEvent,
      onSuccess,
      onError: () => taskEvent.onError()
    });
  }

  public onRemoveProject() {
    this.projectEvent.emit({
      type: DELETE_PROJECT_EVENT,
      project: this.project,
      onSuccess: () => null,
    });
  }

  public onCreateTask(task: Task) {
    this.projectEvent.emit({
      type: UPDATE_PROJECT_EVENT,
      project: Object.assign({}, this.project, {
        tasks: [...this.project.tasks, task],
      }),
      onSuccess: (project: Project) => this._updateProject(project),
    });
  }

  private _updateProject(project: Project) {
    this.project = project;
  }
}
