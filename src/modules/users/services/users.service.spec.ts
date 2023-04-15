import { userArray } from '@/constants/test.constant';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';
import { UserService } from './users.service';

const newUser = {
  password: process.env.DEFAULT_USER_PASSWORD as string,
  email: 'test@gmail.com',
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(newUser),
            create: jest.fn().mockResolvedValue(newUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser()', () => {
    it('should successfully insert a user', () => {
      expect(service.createUser(newUser)).resolves.toEqual(newUser);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('test@gmail.com')).resolves.toEqual(newUser);
      expect(repoSpy).toBeCalledWith({ email: 'test@gmail.com' });
    });
  });
});
