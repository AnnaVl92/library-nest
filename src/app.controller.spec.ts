import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { AppController } from './app.controller';
import { ACCESS_TOKEN_COOKIE } from './services';

describe('AppController', () => {
  let appController: AppController;
  let jwtService: { verify: jest.Mock };

  beforeEach(async () => {
    jwtService = { verify: jest.fn() };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: JwtService, useValue: jwtService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('redirects unauthenticated user to /auth/signin', () => {
      const redirect = jest.fn();
      const req = { cookies: {} } as Request;
      const res = { redirect } as unknown as Response;

      appController.root(req, res);

      expect(redirect).toHaveBeenCalledWith('/auth/signin');
    });

    it('redirects authenticated user to /books', () => {
      jwtService.verify.mockReturnValue({});
      const redirect = jest.fn();
      const req = {
        cookies: { [ACCESS_TOKEN_COOKIE]: 'valid-token' },
      } as unknown as Request;
      const res = { redirect } as unknown as Response;

      appController.root(req, res);

      expect(jwtService.verify).toHaveBeenCalledWith('valid-token');
      expect(redirect).toHaveBeenCalledWith('/books');
    });

    it('redirects to signin when token is invalid', () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('invalid');
      });
      const redirect = jest.fn();
      const req = {
        cookies: { [ACCESS_TOKEN_COOKIE]: 'bad-token' },
      } as unknown as Request;
      const res = { redirect } as unknown as Response;

      appController.root(req, res);

      expect(redirect).toHaveBeenCalledWith('/auth/signin');
    });
  });
});
