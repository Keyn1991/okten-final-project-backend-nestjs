import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { User } from '../../mongo/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async register(
    name: string,
    surname: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createUserDto: CreateUserDto = {
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    };
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }
}
