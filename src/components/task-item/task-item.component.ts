import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Task } from 'src/shared/core/tasks/task';

export const UPDATE_TASK_EVENT = 'UPDATE_TASK_EVENT';
export const COMPLETE_TASK_EVENT = 'COMPLETE_TASK_EVENT';
export const REMOVE_TASK_EVENT = 'REMOVE_TASK_EVENT';

export interface TaskEvent {
  type: string;
  task: Task;
  onSuccess: (task: Task) => void;
  onError: () => void;
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input()
  public task: Task;

  @Output()
  public taskEvent: EventEmitter<TaskEvent>;

  public isChecked = false;

  constructor() {
    this.taskEvent = new EventEmitter();
  }

  public saveContent(description: string) {
    this.taskEvent.emit({
      type: UPDATE_TASK_EVENT,
      task: Object.assign({}, this.task, {description}),
      onSuccess: (task: Task) => this._updateTask(task),
      onError: () => null
    });
  }

  public onComplete() {
    this.taskEvent.emit({
      type: COMPLETE_TASK_EVENT,
      task: this.task,
      onSuccess: (task: Task) => {
        this._updateTask(task);
      },
      onError: () => {
        // TO-DO: is not updating the checkbox
        this.isChecked = false;
      }
    });
  }

  public onRemoveTask() {
    this.taskEvent.emit({
      type: REMOVE_TASK_EVENT,
      task: this.task,
      onSuccess: () => null,
      onError: () => null
    });
  }

  private _updateTask(task: Task) {
    this.task = task;
  }
}
