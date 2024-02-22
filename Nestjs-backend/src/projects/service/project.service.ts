import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  // Implement your service methods here
  async getProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async createProject(
    createProjectDto: Partial<CreateProjectDto>,
  ): Promise<Project> {
    const { title, description, projectCode, status } = createProjectDto;
    const project = this.projectRepository.create({
      title,
      description,
      projectCode,
      status,
    });
    return this.projectRepository.save(project);
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    const { title, description, projectCode, status } = updateProjectDto;
    project.title = title;
    project.description = description;
    project.projectCode = projectCode;
    project.status = status;
    await this.projectRepository.save(project);
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
