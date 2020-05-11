import { dateRangeValidator } from './task-validators';
import { WRONG_TASK_PERIOD_INTERVAL } from './task.errors';
import { ValidationError } from '../validation-error';

describe('TaskValidators', () => {
  let creationDate: Date;
  let finishDate: Date;
  let onSuccessSpy;
  let onErrorSpy;

  beforeEach(() => {
    onSuccessSpy = jasmine.createSpy('onSuccess');
    onErrorSpy = jasmine.createSpy('onError');
  });

  describe('GIVEN creation date = 2-jun-2020', () => {
    beforeEach(() => {
      creationDate = new Date('06-02-2020');
    });

    describe('GIVEN finish date = 3-may-2020', () => {
      beforeEach(() => {
        finishDate = new Date('05-03-2020');
      });

      describe('WHEN validating through dateRangeValidator', () => {
        beforeEach(() =>
          dateRangeValidator(creationDate, finishDate).subscribe({
            next: onSuccessSpy,
            error: onErrorSpy,
          })
        );

        it('THEN it should throw error', () => {
          expect(onErrorSpy).toHaveBeenCalled();
        });

        it('THEN it should throw "wrong task period interval" validation error', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(WRONG_TASK_PERIOD_INTERVAL)
          );
        });

        it('THEN onSuccess should not be called', () => {
          expect(onSuccessSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('GIVEN creation date = 2-jun-2020', () => {
    beforeEach(() => {
      creationDate = new Date('06-02-2020');
    });

    describe('GIVEN finish date = 3-jun-2020', () => {
      beforeEach(() => {
        finishDate = new Date('06-03-2020');
      });

      describe('WHEN validating through dateRangeValidator', () => {
        beforeEach(() =>
          dateRangeValidator(creationDate, finishDate).subscribe({
            next: onSuccessSpy,
            error: onErrorSpy,
          })
        );

        it('THEN it should not throw error', () => {
          expect(onErrorSpy).not.toHaveBeenCalled();
        });

        it('THEN onSuccess should be called', () => {
          expect(onSuccessSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
