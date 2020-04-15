import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';
import { User } from './user.entity';

const mockCredentialsDto = {
  username: 'Test Username',
  password: 'TestPassword123!',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('should sign up a user', () => {
      // arrange
      save.mockResolvedValue(undefined);

      // act
      const signUpResult = userRepository.signUp(mockCredentialsDto);

      // assert
      expect(signUpResult).resolves.not.toThrow();
    });

    it('should throw a conflict exception when username already exists', () => {
      // arrange
      save.mockRejectedValue({ code: '23505' });

      // act
      const signUpResult = userRepository.signUp(mockCredentialsDto);

      // assert
      expect(signUpResult).rejects.toThrow(ConflictException);
    });

    it('should throw a conflict exception when username already exists', () => {
      // arrange
      save.mockRejectedValue({ code: '123123' });

      // act
      const signUpResult = userRepository.signUp(mockCredentialsDto);

      // assert
      expect(signUpResult).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'Test Username';
      user.validatePassword = jest.fn();
    });

    it('should return the username upon successful validation', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const validationResult = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );

      expect(validationResult).toEqual(mockCredentialsDto.username);
    });

    it('should return null when user could not be found', async () => {
      // arrange
      userRepository.findOne.mockResolvedValue(null);

      // act
      const validationResult = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );

      // assert
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(validationResult).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      // arrange
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);

      // act
      const validationResult = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );

      // assert
      expect(user.validatePassword).toHaveBeenCalledTimes(1);
      expect(validationResult).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('should hash a password using bcrypt', async () => {
      const expectedHash = 'testHash';
      (bcrypt.hash as any) = jest.fn().mockResolvedValue(expectedHash);

      const result = await userRepository.hashPassword(
        'testPassword',
        'testSalt',
      );

      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedHash);
    });
  });
});
