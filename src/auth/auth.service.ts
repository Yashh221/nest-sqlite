import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(loginDto: { username: string; password: string }) {
    const { username, password } = loginDto;
    const isValid = await this.usersService.validatePassword(
      username,
      password,
    );

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const user = await this.usersService.findOneByUsername(username);
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(loginDto: { username: string; password: string }) {
    const { username, password } = loginDto;
    await this.usersService.create(username, password);
    const user = await this.usersService.findOneByUsername(username);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
