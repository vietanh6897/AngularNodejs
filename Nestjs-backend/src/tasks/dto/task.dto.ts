import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter title' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter description' })
  description: string;

  @ApiProperty({ example: 'Lowest' })
  @IsNotEmpty({ message: 'Please enter priority' })
  @IsIn(['Lowest', 'Low', 'High', 'Highest'], {
    message: 'Invalid input',
  })
  priority: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter dueDate' })
  dueDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter startDate' })
  startDate: Date;

  @ApiProperty({ example: 'Feature' })
  @IsNotEmpty({ message: 'Please enter category' })
  @IsIn(['Bug', 'Feature'], {
    message: 'Invalid input',
  })
  category: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty({ message: 'Please enter status' })
  @IsIn(['TODO', 'INPROGRESS', 'TESTING', 'DONE'], {
    message: 'Invalid input',
  })
  status: string;

  @ApiProperty({ example: '1b235387-76bd-4500-9a32-101e0da62942' })
  @IsNotEmpty({ message: 'Please enter assignee' })
  assignee: string;
}

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter title' })
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter description' })
  description?: string;

  @ApiPropertyOptional({ example: 'Lowest' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter priority' })
  @IsIn(['Lowest', 'Low', 'High', 'Highest'], {
    message: 'Invalid input',
  })
  priority: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter dueDate' })
  dueDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter startDate' })
  startDate: Date;

  @ApiPropertyOptional({ example: 'Bug' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter category' })
  @IsIn(['Bug', 'Feature'], {
    message: 'Invalid input',
  })
  category: string;

  @ApiPropertyOptional({ example: 'TODO' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter status' })
  @IsIn(['TODO', 'INPROGRESS', 'TESTING', 'DONE'], {
    message: 'Invalid input',
  })
  status: string;

  @ApiPropertyOptional({ example: '1b235387-76bd-4500-9a32-101e0da62942' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter assignee' })
  assignee: string;
}

export class SearchTaskDto {
  @ApiPropertyOptional({ example: 'abc' })
  @IsOptional()
  searchKeyword?: string;

  @ApiPropertyOptional({
    example:
      '1b235387-76bd-4500-9a32-101e0da62942,f1054914-711c-4117-8a55-763082f42c2c',
  })
  @IsOptional()
  members?: string;

  @ApiPropertyOptional({ example: 'Bug,Feature' })
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'TODO,DONE' })
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'Low,High' })
  @IsOptional()
  priority?: string;
}
