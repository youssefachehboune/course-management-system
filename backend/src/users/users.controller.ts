import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtUsername } from '../auth/jwt-username.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiBearerAuth()
    @Get('mycourses')
    @ApiResponse({ status: 200, description: 'The user courses' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'User Name is required' })

    @UseGuards(JwtAuthGuard)
    getMyCourses(@JwtUsername() username: string) {
        if (!username) {
            throw new Error('User Name is required');
        }
        return this.userService.getMyCourses(username);
    }
}
