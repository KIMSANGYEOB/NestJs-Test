import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach 로 할경우 각 테스팅시마다 실행되므로 모듈이 여러번 실행될 수 있으니 주의
  beforeAll(async () => {
    // 여기서 실제 어플리케이션의 환경을 설정해줘야함
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 데코레이터에 없는 속성값은 제외 후 저장
        forbidNonWhitelisted: true, // 데코레이터에 없는 속성이 있을경우 Exception
        transform: true, // url 인자를 타입에 맞게 자동변환
      }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer()).get('/movies').expect(200).expect([])
  })

  it('/movies (POST 201)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({title: 'test', year: 2000, genres: ['test']})
      .expect(201)
  })

  it('/movies (POST 400)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({title: 'test', year: 2000, genres: ['test'], hack: 'hacker in'})
      .expect(400)
  })

  it('/movies (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
  })

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    })

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({title: 'success test'})
        .expect(200);
    })

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    })
  })
});
