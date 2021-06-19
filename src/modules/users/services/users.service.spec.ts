import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    console.log(service);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
