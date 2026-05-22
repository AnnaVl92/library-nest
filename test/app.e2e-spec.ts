import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { App } from 'supertest/types';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { AppModule } from './../src/app.module';
import { ACCESS_TOKEN_COOKIE } from './../src/services';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    config();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET) redirects unauthenticated user to /auth/signin', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(302)
      .expect('Location', '/auth/signin');
  });

  it('/ (GET) redirects authenticated user to /books', () => {
    const jwtService = app.get(JwtService);
    const token = jwtService.sign({
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
    });

    return request(app.getHttpServer())
      .get('/')
      .set('Cookie', [`${ACCESS_TOKEN_COOKIE}=${token}`])
      .expect(302)
      .expect('Location', '/books');
  });
});
