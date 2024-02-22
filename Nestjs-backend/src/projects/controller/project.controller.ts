import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from '../service/project.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';
import { MemberService } from 'src/members/service/member.service';
import { ApiException } from 'src/common/swagger/api-exception.swagger';

@Controller('projects')
@ApiTags('projects')
@ApiBearerAuth('access-token')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private memberService: MemberService,
  ) {}

  // Implement your CRUD endpoints here
  @Get()
  @ApiOkResponse({ description: 'Retrieved all projects successfully.' })
  async getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved project by ID successfully.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  async getProjectById(@Param('id') id: string): Promise<Project> {
    const project = await this.projectService.getProjectById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The project has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  async createProject(
    @Request() req: any,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const user = req.user;
    const project = await this.projectService.createProject(createProjectDto);
    await this.memberService.createMember([
      {
        projectId: project.id,
        userId: user.userId,
      },
    ]);
    return project;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'The project has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectService.updateProject(
      id,
      updateProjectDto,
    );
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The project has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  async deleteProject(@Param('id') id: string): Promise<void> {
    return this.projectService.deleteProject(id);
  }

  @Get('/user/:userId')
  @ApiOkResponse({
    description: 'Retrieved all projects by user successfully.',
  })
  async findProjectsByUser(
    @Param('userId') userId: string,
  ): Promise<Project[]> {
    return this.memberService.findProjectsByUser(userId);
  }
}
