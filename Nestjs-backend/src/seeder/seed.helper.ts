import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { run } from './database.seed';

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  try {
    const dataSource = app.get(DataSource);
    await run(dataSource);
  } catch (error) {
    console.error('Error running database seed:', error);
  }
}
runSeeder();
