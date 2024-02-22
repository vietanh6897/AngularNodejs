import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DataSource } from 'typeorm';
import { run } from './seeder/database.seed';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  //Run seeding database
  try {
    const dataSource = app.get(DataSource);
    await run(dataSource);
  } catch (error) {
    console.error('Error running database seed:', error);
  }

  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe());

  //For custom class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Enable CORS
  app.enableCors();

  //Config swagger
  const config_swagger = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API documentation for Task Manager application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description:
          "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter your token in the text input below.\r\n\r\nExample: 'yJhbG...'",
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
