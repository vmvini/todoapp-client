import { of } from 'rxjs';
import { Task } from './task';
import { TaskMainService } from './task-main.service';
import {
  MISSING_TASK_CREATION_DATE,
  MISSING_TASK_DESCRIPTION,
  MISSING_TASK_FINISH_DATE,
  MISSING_TASK_PERIOD,
  NOT_DELETABLE_TASK,
  NOT_EDITABLE_TASK,
  WRONG_TASK_PERIOD_INTERVAL,
} from './task.errors';
import { TaskService } from './task.service';
import { ValidationError } from '../validation-error';
import { addDays } from './period';

const invalidTasks = {
  [NOT_DELETABLE_TASK.code]: Object.assign(getValidTask(), {
    finished: true,
  }),
  [NOT_EDITABLE_TASK.code]: Object.assign(getValidTask(), {
    finished: true,
  }),
  [MISSING_TASK_FINISH_DATE.code]: Object.assign(getValidTask(), {
    period: {
      creation: new Date(),
      finish: null,
    },
  }),
  [MISSING_TASK_CREATION_DATE.code]: Object.assign(getValidTask(), {
    period: {
      creation: null,
      finish: new Date(),
    },
  }),
  [MISSING_TASK_PERIOD.code]: Object.assign(getValidTask(), {
    period: null,
  }),
  [MISSING_TASK_DESCRIPTION.code]: Object.assign(getValidTask(), {
    description: '',
  }),
  [WRONG_TASK_PERIOD_INTERVAL.code]: Object.assign(getValidTask(), {
    period: {
      creation: addDays(new Date(), 3),
      finish: new Date(),
    },
  }),
};

describe('TaskMainService', () => {
  let task;
  let taskMainService: TaskService;
  let innerTaskService: TaskService;
  let onCreateSpy;
  let onEditSpy;
  let onErrorSpy;
  let onSuccessSpy;
  let onDeleteSpy;

  describe('GIVEN a valid task', () => {
    beforeEach(() => {
      task = getValidTask();
    });

    describe('GIVEN successful requests', () => {
      beforeEach(() => {
        innerTaskService = {
          create: () => {
            onCreateSpy();
            return of(task);
          },
          complete: () => of(task),
          edit: () => of(task),
          delete: () => of(task),
        };
      });

      beforeEach(() => {
        taskMainService = new TaskMainService(innerTaskService);
        onCreateSpy = jasmine.createSpy('onCreateSpy');
      });

      describe('WHEN create is called', () => {
        beforeEach(() => {
          onSuccessSpy = jasmine.createSpy('onSuccess');
        });

        beforeEach(() => taskMainService.create(task, null).subscribe(onSuccessSpy));

        it('success callback should be called', () => {
          expect(onSuccessSpy).toHaveBeenCalled();
        });

        it('innerTaskService.create should be called', () => {
          expect(onCreateSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('GIVEN an invalid task', () => {
    beforeEach(() => {
      onSuccessSpy = jasmine.createSpy('onSuccess');
      onErrorSpy = jasmine.createSpy('onErrorSpy');
    });

    function createTaskMainService(t: Task) {
      innerTaskService = {
        create: () => of(task),
        complete: () => of(task),
        edit: () => of(task),
        delete: () => of(task),
      };
      taskMainService = new TaskMainService(innerTaskService);
    }

    describe('GIVEN an already finished task', () => {
      describe('WHEN edit is called', () => {
        beforeEach(() => {
          task = invalidTasks[NOT_EDITABLE_TASK.code];
          createTaskMainService(task);
          onEditSpy = spyOn(innerTaskService, 'edit');
        });

        beforeEach(() => {
          taskMainService
            .edit(task, null)
            .subscribe({ next: onSuccessSpy, error: onErrorSpy });
        });

        it('THEN an error should be thrown', () => {
          expect(onErrorSpy).toHaveBeenCalled();
        });

        it('THEN the "not editable task" validation error should be thrown', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(NOT_EDITABLE_TASK)
          );
        });

        it('THEN onSuccess callback should not be called', () => {
          expect(onSuccessSpy).not.toHaveBeenCalled();
        });

        it('THEN innerTaskService.edit should not be called', () => {
          expect(onEditSpy).not.toHaveBeenCalled();
        });
      });

      describe('WHEN delete is called', () => {
        beforeEach(() => {
          task = invalidTasks[NOT_DELETABLE_TASK.code];
          createTaskMainService(task);
          onDeleteSpy = spyOn(innerTaskService, 'delete');
        });

        beforeEach(() => {
          taskMainService
            .delete(task, null)
            .subscribe({ next: onSuccessSpy, error: onErrorSpy });
        });

        it('THEN an error should be thrown', () => {
          expect(onErrorSpy).toHaveBeenCalled();
        });

        it('THEN the "not deletable task" validation error should be thrown', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(NOT_DELETABLE_TASK)
          );
        });

        it('THEN onSuccess callback should not be called', () => {
          expect(onSuccessSpy).not.toHaveBeenCalled();
        });

        it('THEN innerTaskService.delete should not be called', () => {
          expect(onDeleteSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('GIVEN a missing description', () => {
      beforeEach(() => {
        task = invalidTasks[MISSING_TASK_DESCRIPTION.code];
        createTaskMainService(task);
        onCreateSpy = spyOn(innerTaskService, 'create');
      });

      describe('WHEN create is called', () => {
        beforeEach(() =>
          taskMainService
            .create(task, null)
            .subscribe({ next: onSuccessSpy, error: onErrorSpy })
        );

        it('THEN onErrorSpy should be called', () => {
          expect(onErrorSpy).toHaveBeenCalled();
        });

        it('THEN onErrorSpy should be called with "missing task description" validation error', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(MISSING_TASK_DESCRIPTION)
          );
        });

        it('THEN innerTaskService.create should not be called', () => {
          expect(onCreateSpy).not.toHaveBeenCalled();
        });

        it('THEN onSuccessSpy should not be called', () => {
          expect(onSuccessSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('GIVEN creation date greater than finish date', () => {
      beforeEach(() => {
        task = invalidTasks[WRONG_TASK_PERIOD_INTERVAL.code];
        createTaskMainService(task);
      });

      describe('WHEN edit is called', () => {
        beforeEach(() => {
          taskMainService
            .edit(task, null)
            .subscribe({ next: onSuccessSpy, error: onErrorSpy });
        });

        it('THEN an error should be thrown', () => {
          expect(onErrorSpy).toHaveBeenCalled();
        });

        it('THEN the "wrong task period" validation error should be thrown', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(WRONG_TASK_PERIOD_INTERVAL)
          );
        });
      });
    });
  });
});

function getValidTask(): Task {
  return {
    _id: 'fakeId',
    description: 'test1',
    period: {
      creation: new Date(),
      finish: addDays(new Date(), 3),
    },
    finished: false,
  };
}
