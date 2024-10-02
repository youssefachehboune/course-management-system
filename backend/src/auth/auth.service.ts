// auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user with username, full name, and password
   * @param username Username of the new user
   * @param fullName Full name of the new user
   * @param password Password of the new user
   */
  async register(createUserDto: CreateUserDto) {
    const { username, fullName, password } = createUserDto;
    if(!username || !fullName || !password) {
      throw new BadRequestException('Username, full name, and password are required');
    }
    const userExists = await this.usersService.findByUsername(username);
    if (userExists) {
      throw new BadRequestException('Username is already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser(username, fullName, hashedPassword);

    const payload = { username: newUser.username, sub: newUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Validate user credentials and generate JWT
   * @param username Username for login
   * @param password Password for login
   * @returns JWT token if the user is validated
   */
  async login(loginDto: LoginDto) : Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    if (!username || !password) {
      throw new UnauthorizedException('Invalid credentials');
  }
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
