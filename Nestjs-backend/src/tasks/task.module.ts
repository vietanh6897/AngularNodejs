import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskRepository } from './repository/task.repository';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { TypeOrmExModule } from 'src/configs/database/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmExModule.forCustomRepository([TaskRepository]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
