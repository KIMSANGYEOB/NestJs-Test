import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터에 없는 속성값은 제외 후 저장
      forbidNonWhitelisted: true, // 데코레이터에 없는 속성이 있을경우 Exception
      transform: true, // url 인자를 타입에 맞게 자동변환
    }));
  await app.listen(3000);
  }
bootstrap();
