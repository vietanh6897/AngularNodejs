import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { CustomRepository } from 'src/configs/database/typeorm-ex.decorator';

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Add custom methods for task data access here
}
