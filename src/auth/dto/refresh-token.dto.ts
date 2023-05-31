import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ required: true, example: 'refresh_token' })
  @IsString()
  refreshToken: string;
}
