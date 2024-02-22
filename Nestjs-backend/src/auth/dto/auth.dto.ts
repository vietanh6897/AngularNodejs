import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class AuthCreadentialsDto {
  @ApiProperty({ example: 'VA01' })
  @IsNotEmpty({ message: 'Please enter a email' })
  username: string;

  @ApiProperty({ example: 'Aa12345678@' })
  @IsNotEmpty({ message: 'Please enter a password.' })
  @MinLength(6, { message: 'Please enter a password than 6 characters.' })
  @MaxLength(50, { message: 'Please enter a password less 50 characters.' })
  password: string;
}
