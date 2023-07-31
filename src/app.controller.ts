import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @ApiOperation({ summary: 'Login page' })
  // @ApiResponse({ status: 200, description: 'Returns the login page' })
  // @Get('login')
  // login() {
  //   return 'Login page';
  // }
}
