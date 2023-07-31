import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../mongo/schema/user.schema';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns the list of users' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Returns the user' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Returns the created user' })
  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Returns the updated user' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, userData);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Returns the deleted user' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Find user by email' })
  @ApiParam({ name: 'email', type: String })
  @ApiResponse({ status: 200, description: 'Returns the user' })
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }
}
