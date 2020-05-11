import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TaskEvent } from '../task-item/task-item.component';
import { Task } from 'src/shared/core/tasks/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input()
  public tasks: Task[];

  @Output()
  public taskEvent: EventEmitter<TaskEvent>;
}
