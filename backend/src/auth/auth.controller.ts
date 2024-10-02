// auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/users/dto/login.dto';

/**
 * Controller for authentication-related routes
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user
   * @param body Contains username, fullName, and password
   */
  @Post('register')
  @ApiBody({ type: CreateUserDto ,
    examples: {
      'application/json': {
        value: {
          username: 'testuser',
          fullName: 'Test User',
          password: 'password123'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Username is already taken' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * Login with username and password
   * @param body Contains username and password
   * @returns JWT token
   */
  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto ,
    examples: {
      'application/json': {
        value: {
          username: 'testuser',
          password: 'password123'
        }
      }
    }
  })

  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
