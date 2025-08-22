import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ❌ elimina campos que no estén en el DTO
      forbidNonWhitelisted: true, // 🚨 lanza error si mandan un campo no definido en el DTO
      forbidUnknownValues: true,
      transform: true, // ✅ convierte datos a las clases DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
