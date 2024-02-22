import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { CustomRepository } from 'src/configs/database/typeorm-ex.decorator';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
  // Add custom methods for project data access here
}
