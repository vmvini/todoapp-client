import { Project } from './project';
import { throwError, of } from 'rxjs';
import { ValidationError } from '../validation-error';
import { MISSING_PROJECT_NAME } from './project.errors';

export const projectValidator = (project: Project) => {
    if ( !project.name ) {
      return throwError(new ValidationError(MISSING_PROJECT_NAME));
    }
    return of(true);
};
