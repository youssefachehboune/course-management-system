import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * AllExceptionsFilter is a global exception filter that catches all exceptions
 * and formats the response in a consistent manner.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * Method that handles the exception and formats the response.
   *
   * @param {unknown} exception - The exception that was thrown.
   * @param {ArgumentsHost} host - The execution context of the request.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine the status code based on the type of exception
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Determine the response message based on the type of exception
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Send the formatted response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
