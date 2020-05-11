import { Period } from './period';
import { Entity } from '../entity';

export interface Task extends Entity {
  description: string;
  period: Period;
  finished: boolean;
}
