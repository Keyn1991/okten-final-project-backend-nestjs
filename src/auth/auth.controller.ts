import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@ApiTags('Authentication')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Returns the authentication token' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { email, password } = loginDto;
    const { access_token, refresh_token } = await this.authService.login(
      email,
      password,
    );
    if (!access_token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    res.send({ access_token, refresh_token });
  }

  // @ApiOperation({ summary: 'User registration' })
  // @ApiResponse({ status: 201, description: 'Returns the access token' })
  // @Post('register')
  // async register(@Body() registerDto: RegisterDto): Promise<AccessTokenDto> {
  //   const { name, surname, email, password, role } = registerDto;
  //   const existingUser = await this.userService.findByEmail(email);
  //   if (existingUser) {
  //     throw new UnauthorizedException('Користувач з таким email вже існує');
  //   }
  //
  //   const createdUser = await this.authService.register(
  //     name,
  //     surname,
  //     email,
  //     password,
  //     role,
  //   );
  //
  //   if (!createdUser) {
  //     throw new UnauthorizedException('Помилка при реєстрації');
  //   }
  //
  //   const payload = { sub: createdUser.id };
  //   const access_token = this.jwtService.sign(payload);
  //   return { access_token };
  // }
  @Get('checkLoggedInStatus')
  async checkLoggedInStatus(@Res() res: Response): Promise<void> {
    const authToken = res.getHeader('Authorization') as string;
    if (!authToken || typeof authToken !== 'string') {
      throw new UnauthorizedException('No token provided');
    }

    const tokenParts = authToken.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const hasValidToken = await this.authService.hasValidToken(tokenParts[1]);
      if (!hasValidToken) {
        throw new UnauthorizedException('Invalid token');
      }
      res.send({ loggedIn: true });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
