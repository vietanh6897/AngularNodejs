import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/common/validation/is-unique';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter name' })
  @ApiProperty()
  @IsUnique({ tableName: 'user', column: 'username', title: 'username' })
  @MaxLength(50, { message: 'Please enter a username less 255 characters.' })
  username: string;

  @IsNotEmpty({ message: 'Please enter email' })
  @IsEmail({}, { message: 'Please enter the correct email format.' })
  @ApiProperty({ example: '123456@gmail.com' })
  @IsUnique({ tableName: 'user', column: 'email', title: 'email' })
  @MaxLength(50, { message: 'Please enter an email less 255 characters.' })
  email: string;

  @ApiProperty({ example: 'Aa12345678@' })
  @IsNotEmpty({ message: 'Please enter a password than 8 characters.' })
  @MinLength(8, { message: 'Please enter a password than 8 characters.' })
  @MaxLength(50, { message: 'Please enter a password less 50 characters.' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@_#$%^&*]).*$/,
    {
      message: 'Password too weak! Please fix to continue.',
    },
  )
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter id' })
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter name' })
  @IsUnique({ tableName: 'user', column: 'username', title: 'username' })
  username?: string;

  @ApiPropertyOptional({ example: '123456@gmail.com' })
  @IsEmail({}, { message: 'Please enter the correct email format.' })
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter email' })
  @IsUnique({ tableName: 'user', column: 'email', title: 'email' })
  email?: string;
}
