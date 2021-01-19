import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Validator 이전에 데코레이터에 없는 Property 는 제한
    }),
  );
  await app.listen(3000);
}
bootstrap();
