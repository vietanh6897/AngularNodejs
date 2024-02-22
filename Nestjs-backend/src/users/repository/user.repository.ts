import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CustomRepository } from 'src/configs/database/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  // Add custom methods for task data access here
}
