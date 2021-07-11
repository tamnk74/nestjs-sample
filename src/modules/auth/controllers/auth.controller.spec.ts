import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
// import { UserLoginDto } from '../dtos';
import { AuthService } from '../services';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  // let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            generateToken: jest.fn(),
          },
        },
        ConfigService,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    // authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // describe('login', () => {
  //   it('should return access token', async () => {
  //     const user = {
  //       email: 'admin@gmail.com',
  //       password: 'admin123',
  //     } as UserLoginDto;
  //     const token = 'token';
  //     const result = {
  //       access_token: token,
  //     };
  //     jest
  //       .spyOn(authService, 'validateUser')
  //       .mockImplementation(async user => user);
  //     jest
  //       .spyOn(authService, 'generateToken')
  //       .mockImplementation(async () => token);

  //     expect(await authController.login(user)).toBe(result);
  //   });
  // });
});
