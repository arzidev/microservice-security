import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('API Roles & Usuarios')
    .setDescription('Documentación de la API para gestión de usuarios y roles')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});
