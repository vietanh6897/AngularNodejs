import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';
import { ApiException } from '../../common/swagger/api-exception.swagger';

@Controller('users')
@ApiTags('users')
@SkipAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Retrieved all users successfully.' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved user by ID successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'The user has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The user has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get('/available/:projectId')
  @ApiOkResponse({
    description: 'Retrieved available users by projectID successfully.',
  })
  async getAvailableUsers(
    @Param('projectId') projectId: string,
  ): Promise<User[]> {
    return this.userService.getUsersNotInProject(projectId);
  }
}
