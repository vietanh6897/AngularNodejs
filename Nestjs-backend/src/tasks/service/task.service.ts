import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../repository/task.repository';
import { Task } from '../entity/task.entity';
import { CreateTaskDto, SearchTaskDto, UpdateTaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // Implement CRUD methods using taskRepository
  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const {
      title,
      description,
      assignee,
      priority,
      dueDate,
      startDate,
      category,
      status,
    } = updateTaskDto;
    task.title = title;
    task.description = description;
    task.assignee = assignee;
    task.priority = priority;
    task.dueDate = dueDate;
    task.startDate = startDate;
    task.category = category;
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async findAllTasksByProjectId(
    projectId: string,
    searchQuery: SearchTaskDto,
  ): Promise<Task[]> {
    let query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.member', 'member')
      .leftJoinAndSelect('member.user', 'user')
      .leftJoinAndSelect('member.project', 'project')
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.title',
        'task.assignee',
        'task.priority',
        'task.dueDate',
        'task.startDate',
        'task.category',
        'task.status',
        'project.id',
        'member.userId',
        'user.username',
        'user.email',
      ])
      .where('member.projectId = :projectId', { projectId });

    // Filter by search keyword
    if (searchQuery.searchKeyword) {
      query = query.andWhere('LOWER(task.title) LIKE :searchKeyword', {
        searchKeyword: `%${searchQuery.searchKeyword.toLowerCase()}%`,
      });
    }

    // Filter by members
    if (searchQuery.members) {
      query = query.andWhere('task.assignee IN (:...members)', {
        members: searchQuery.members.split(','),
      });
    }

    // Filter by category
    if (searchQuery.category) {
      query = query.andWhere('task.category IN (:...category)', {
        category: searchQuery.category.split(','),
      });
    }

    // Filter by status
    if (searchQuery.status) {
      query = query.andWhere('task.status IN (:...status)', {
        status: searchQuery.status.split(','),
      });
    }

    // Filter by status
    if (searchQuery.priority) {
      query = query.andWhere('task.priority IN (:...priority)', {
        priority: searchQuery.priority.split(','),
      });
    }

    return query.getMany();
  }
}
