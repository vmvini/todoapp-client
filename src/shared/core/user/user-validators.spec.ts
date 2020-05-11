import { UserRegisterData } from './user-register-data';
import { userRegisterDataValidator } from './user-validators';
import { ValidationError } from '../validation-error';
import { INVALID_EMAIL, PASSWORD_FORMAT } from './user.errors';

describe('UserValidators', () => {
  let userData: UserRegisterData;
  let onSuccessSpy;
  let onErrorSpy;
  beforeEach(() => {
    onSuccessSpy = jasmine.createSpy('onSuccessSpy');
    onErrorSpy = jasmine.createSpy('onErrorSpy');
  });

  describe('GIVEN an user', () => {
    beforeEach(() => {
      userData = getValidUserData();
    });

    describe('GIVEN only password is invalid', () => {
      beforeEach(() => {
        userData = Object.assign(userData, { password: '21212' });
      });

      describe('WHEN user data is validated ', () => {
        beforeEach(() => {
          userRegisterDataValidator(userData).subscribe({
            next: onSuccessSpy,
            error: onErrorSpy,
          });
        });
        it('THEN it should throw password format error', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(PASSWORD_FORMAT)
          );
        });
        it('THEN it should not call onSuccessSpy', () => {
          expect(onSuccessSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('GIVEN an invalid email', () => {
      beforeEach(() => {
        userData = Object.assign(userData, { email: 'vmijds@ksdj' });
      });

      describe('WHEN user data is being validated', () => {
        beforeEach(() => {
          userRegisterDataValidator(userData).subscribe({
            next: onSuccessSpy,
            error: onErrorSpy,
          });
        });
        it('THEN it should throw email format error', () => {
          expect(onErrorSpy).toHaveBeenCalledWith(
            new ValidationError(INVALID_EMAIL)
          );
        });
        it('THEN it should not call onSuccessSpy', () => {
          expect(onSuccessSpy).not.toHaveBeenCalled();
        });
      });

      describe('GIVEN an invalid password and invalid email', () => {
        beforeEach(() => {
          userData = Object.assign(userData, { password: '21212' });
        });
        describe('WHEN user data is validated ', () => {
          beforeEach(() => {
            userRegisterDataValidator(userData).subscribe({
              next: onSuccessSpy,
              error: onErrorSpy,
            });
          });
          it('THEN it should throw email format error', () => {
            expect(onErrorSpy).toHaveBeenCalledWith(
              new ValidationError(INVALID_EMAIL)
            );
          });
          it('THEN it should not call onSuccessSpy', () => {
            expect(onSuccessSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});

function getValidUserData(): UserRegisterData {
  return {
    name: 'test',
    email: 'vmvini@hotmail.com',
    password: '2lKj3l2j(',
    confirmPassword: '2lKj3l2j(',
  };
}
