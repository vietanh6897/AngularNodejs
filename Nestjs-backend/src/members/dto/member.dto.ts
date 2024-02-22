import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ example: '098497f1-b25b-400e-9e79-9f307a95353b' })
  @IsNotEmpty({ message: 'Please enter projectId' })
  projectId: string;

  @ApiProperty({ example: '15ba8275-20a5-4ac9-a680-dc3f0117632d' })
  @IsNotEmpty({ message: 'Please enter userId' })
  userId: string;
}

export class UpdateMemberDto {
  @ApiPropertyOptional({ example: '098497f1-b25b-400e-9e79-9f307a95353b' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter projectId' })
  projectId: string;

  @ApiPropertyOptional({ example: '15ba8275-20a5-4ac9-a680-dc3f0117632d' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter userId' })
  userId: string;
}
