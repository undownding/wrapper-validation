import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) - should wrap string response', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: 200,
          message: 'success',
          data: 'Hello World!',
        });
      });
  });

  it('/json (GET) - should wrap object response', () => {
    return request(app.getHttpServer())
      .get('/json')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: 200,
          message: 'success',
          data: { foo: 'bar' },
        });
      });
  });

  it('/json-with-data (GET) - should not wrap response that already has data property', () => {
    return request(app.getHttpServer())
      .get('/json-with-data')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          foo: 'bar',
          data: { id: 1, name: 'Test' },
        });
      });
  });

  it('/401 (GET) - should handle UnauthorizedException', () => {
    return request(app.getHttpServer()).get('/401').expect(401);
  });

  it('/500 (GET) - should handle internal server error', () => {
    return request(app.getHttpServer()).get('/500').expect(500);
  });
});
