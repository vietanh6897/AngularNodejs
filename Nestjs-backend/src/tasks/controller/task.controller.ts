import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto, SearchTaskDto } from '../dto/task.dto';
import { TaskService } from '../service/task.service';
import { Task } from '../entity/task.entity';
import { ApiException } from 'src/common/swagger/api-exception.swagger';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth('access-token')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOkResponse({ description: 'Retrieved all tasks successfully.' })
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved task by ID successfully.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'The task has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskService.updateTask(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The task has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Get('/project/:projectId')
  @ApiOkResponse({ description: 'Retrieved tasks by projectId successfully.' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  async findAllTasksByProjectId(
    @Param('projectId') projectId: string,
    @Query() query: SearchTaskDto,
  ): Promise<Task[]> {
    return this.taskService.findAllTasksByProjectId(projectId, query);
  }
}
