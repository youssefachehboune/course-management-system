import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AllExceptionsFilter } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  /**
   * Test to verify that the filter is defined.
   */
  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  /**
   * Test to verify that the filter correctly catches an HTTP exception and formats the response.
   */
  it('should catch http exception and format response correctly', () => {
    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: '/test-url',
      }),
    } as unknown as ArgumentsHost;

    const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
    filter.catch(exception, host);

    expect(host.switchToHttp().getResponse().status).toHaveBeenCalledWith(
      HttpStatus.BAD_REQUEST,
    );
    expect(host.switchToHttp().getResponse().json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: expect.any(String),
      path: '/test-url',
      message: 'Test error',
    });
  });

  /**
   * Test to verify that the filter correctly catches a non-HTTP exception and formats the response.
   */
  it('should catch non-http exception and format response correctly', () => {
    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: '/test-url',
      }),
    } as unknown as ArgumentsHost;

    const exception = new Error('Test non-http error');
    filter.catch(exception, host);

    expect(host.switchToHttp().getResponse().status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(host.switchToHttp().getResponse().json).toHaveBeenCalledWith({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: expect.any(String),
      path: '/test-url',
      message: 'Internal server error',
    });
  });
});
