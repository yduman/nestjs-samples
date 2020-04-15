import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

describe('UserEntity', () => {
  describe('validatePassword', () => {
    let user: User;
    const testPassword = 'TestPassword123!';
    const testSalt = 'testSalt';

    beforeEach(() => {
      user = new User();
      user.password = testPassword;
      user.salt = testSalt;
      (bcrypt.hash as any) = jest.fn();
    });

    it('should return true when password is valid', async () => {
      // arrange
      (bcrypt.hash as any).mockReturnValue(testPassword);
      const password = '123456';

      // act
      const validationResult = await user.validatePassword(password);

      // assert
      expect(validationResult).toBeTruthy();
      expect(bcrypt.hash).toHaveBeenCalledWith(password, testSalt);
    });

    it('should return false when password is invalid', async () => {
      // arrange
      const password = 'someWrongPassword';
      (bcrypt.hash as any).mockReturnValue(password);

      // act
      const validationResult = await user.validatePassword(password);

      // assert
      expect(validationResult).toBeFalsy();
      expect(bcrypt.hash).toHaveBeenCalledWith(password, testSalt);
    });
  });
});
