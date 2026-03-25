import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. HABILITANDO O CORS PARA O FRONTEND CONSEGUIR ACESSAR
  app.enableCors();

  // 2. MANTENDO AS SUAS VALIDAÇÕES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('API do Cinema')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 3. ESCUTANDO EM "0.0.0.0" PARA FUNCIONAR DENTRO DO DOCKER
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
