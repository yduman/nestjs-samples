import { Test } from '@nestjs/testing';

import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('should validate and return the user based on the JWT payload', async () => {
      // arrange
      const user = new User();
      const username = 'TestUser';
      user.username = username;
      userRepository.findOne.mockResolvedValue(user);

      // act
      const validationResult = await jwtStrategy.validate({ username });

      // assert
      expect(validationResult).toEqual(user);
      expect(userRepository.findOne).toHaveBeenLastCalledWith({ username });
    });

    it('should throw an unauthorized exception when user cannot be found', () => {
      // arrange
      userRepository.findOne.mockResolvedValue(null);
      const username = 'TestUser';

      // act
      const validationResult = jwtStrategy.validate({ username });

      // assert
      expect(validationResult).rejects.toThrow(UnauthorizedException);
    });
  });
});
