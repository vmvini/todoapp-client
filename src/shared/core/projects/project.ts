import { Task } from '../tasks/task';
import { Entity } from '../entity';

export interface Project extends Entity {
  name: string;
  tasks: Task[];
}
