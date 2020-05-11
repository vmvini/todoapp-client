import { Project } from '../projects/project';
import { Entity } from '../entity';

export interface User extends Entity{
  email: string;
  name: string;
  projects: Project[];
}
