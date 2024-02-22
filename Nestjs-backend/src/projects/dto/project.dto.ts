import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { IsUnique } from 'src/common/validation/is-unique';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter title' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter description' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter projectCode' })
  @MaxLength(10, { message: 'Please enter projectCode less 10 characters.' })
  @IsUnique({
    tableName: 'project',
    column: 'projectCode',
    title: 'projectCode',
  })
  projectCode: string;

  @ApiProperty({ example: 'OPENED' })
  @IsNotEmpty({ message: 'Please enter status' })
  @IsIn(['OPENED', 'PENDING', 'CLOSED'], {
    message: 'Invalid input',
  })
  status: string;
}

export class UpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter id' })
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter title' })
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter description' })
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter projectCode' })
  @IsUnique({
    tableName: 'project',
    column: 'projectCode',
    title: 'projectCode',
  })
  @MaxLength(10, { message: 'Please enter projectCode less 10 characters.' })
  projectCode?: string;

  @ApiPropertyOptional({ example: 'OPENED' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter status' })
  @IsIn(['OPENED', 'PENDING', 'CLOSED'], {
    message: 'Invalid input',
  })
  status?: string;
}
