import { ApiProperty } from '@nestjs/swagger';

export class ApiException {
  @ApiProperty({ example: ['Something wrong in your request'] })
  message: string[];
  @ApiProperty({ example: 'Bad Request' })
  error: string;
  @ApiProperty({ example: 400 })
  statusCode: number;
}
