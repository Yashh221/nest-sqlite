import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: { username: string; password: string },
  ): Promise<User> {
    return this.usersService.create(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
