import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsOptional()
  surname: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'user', description: 'User role' })
  role: string;
}
