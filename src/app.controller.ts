import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Login page' })
  @ApiResponse({ status: 200, description: 'Returns the login page' })
  @Get('login')
  login() {
    return 'Login page';
  }
}
