import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Redirects to orders page' })
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.authService.login(email, password);
    if (!user) {
      throw new UnauthorizedException('Неправильний email або пароль');
    }
    res.redirect('/orders');
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'Returns the access token' })
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('surname') surname: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Користувач з таким email вже існує');
    }

    const createdUser = await this.authService.register(
      name,
      surname,
      email,
      password,
      role,
    );

    if (!createdUser) {
      throw new UnauthorizedException('Помилка при реєстрації');
    }

    const payload = { sub: createdUser.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
