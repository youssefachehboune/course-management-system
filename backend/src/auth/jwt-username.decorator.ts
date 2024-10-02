import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const JwtUsername = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
        return null; // or throw an error if you prefer
    }

    const jwtService = new JwtService({ secret: 'supersecretkey' }); // Replace with your actual secret key
    try {
      const decoded: any = await jwtService.verifyAsync(token);
      return decoded.username; // Adjust according to your token structure
    } catch (error) {
      return null; // or handle the error accordingly
    }
  },
);
