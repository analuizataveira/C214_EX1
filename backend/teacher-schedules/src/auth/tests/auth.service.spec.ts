import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { StorageService } from '../../local-db/local-db.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let storageServiceMock: Partial<StorageService>;

  beforeEach(async () => {
    storageServiceMock = {
      findUser: jest.fn(),
      addUser: jest.fn(),
      getAllUsers: jest.fn(),
      removeUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: StorageService, useValue: storageServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    storageServiceMock = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should throw NotFoundException if user already exists', () => {
      const createAuthDto = { email: 'test@example.com', password: '123456' };
      jest.spyOn(storageServiceMock, 'findUser').mockReturnValue(createAuthDto);

      expect(() => service.signup(createAuthDto)).toThrow(BadRequestException);
    });

    it('should create a new user if email is not taken', () => {
      const createAuthDto = { email: 'test@example.com', password: '123456' };
      jest.spyOn(storageServiceMock, 'findUser').mockReturnValue(undefined);
      jest.spyOn(storageServiceMock, 'addUser').mockReturnValue(createAuthDto);

      const result = service.signup(createAuthDto);

      expect(result).toEqual(createAuthDto);
      expect(storageServiceMock.addUser).toHaveBeenCalledWith(createAuthDto);
    });
  });

  describe('signin', () => {
    it('should throw NotFoundException if user does not exist', () => {
      const createAuthDto = { email: 'test@example.com', password: '123456' };
      jest.spyOn(storageServiceMock, 'findUser').mockReturnValue(undefined);

      expect(() => service.singin(createAuthDto)).toThrow(NotFoundException);
    });

    it('should throw BadRequestException if password does not match', () => {
      const createAuthDto = {
        email: 'test@example.com',
        password: 'wrongpass',
      };
      const user = { email: 'test@example.com', password: '123456' };
      jest.spyOn(storageServiceMock, 'findUser').mockReturnValue(user);

      expect(() => service.singin(createAuthDto)).toThrow(BadRequestException);
    });

    it('should return user if email and password match', () => {
      const createAuthDto = { email: 'test@example.com', password: '123456' };
      const user = { email: 'test@example.com', password: '123456' };
      jest.spyOn(storageServiceMock, 'findUser').mockReturnValue(user);

      const result = service.singin(createAuthDto);

      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const users = [
        { email: 'user1@example.com', password: '123456' },
        { email: 'user2@example.com', password: 'abcdef' },
      ];
      jest.spyOn(storageServiceMock, 'getAllUsers').mockReturnValue(users);

      const result = service.findAll();

      expect(result).toEqual(users);
      expect(storageServiceMock.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by email', () => {
      const user = { email: 'test@example.com', password: '123456' };
      jest.spyOn(storageServiceMock, 'findUser').mockReturnValue(user);

      const result = service.findOne('test@example.com');

      expect(result).toEqual(user);
      expect(storageServiceMock.findUser).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });

  describe('remove', () => {
    it('should remove a user by email', () => {
      const email = 'test@example.com';
      jest
        .spyOn(storageServiceMock, 'removeUser')
        .mockReturnValue('User removed!');

      const result = service.remove(email);

      expect(result).toBe('User removed!');
      expect(storageServiceMock.removeUser).toHaveBeenCalledWith(email);
    });
  });
});
