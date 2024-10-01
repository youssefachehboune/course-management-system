import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { ResponseInterceptor } from './response.interceptor';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseInterceptor],
    }).compile();

    interceptor = module.get<ResponseInterceptor<any>>(ResponseInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should correctly format the response', done => {
    const mockExecutionContext: Partial<ExecutionContext> = {
      /**
       * Switches the context to HTTP and provides request and response objects.
       *
       * @return {any} An object containing getRequest and getResponse functions.
       */
      switchToHttp: () =>
        ({
          getRequest: () => ({ url: '/test' }) as any,
          getResponse: () => ({ statusCode: 200 }) as any,
        }) as any,
    };

    const mockCallHandler: Partial<CallHandler> = {
      /**
       * Handles the incoming request and returns an observable of the response data.
       *
       * @return {Observable<any>} An observable containing the response data.
       */
      handle: () => of({ data: 'test' }),
    };

    interceptor
      .intercept(
        mockExecutionContext as ExecutionContext,
        mockCallHandler as CallHandler,
      )
      .subscribe(result => {
        expect(result).toEqual({
          statusCode: 200,
          timestamp: expect.any(String),
          path: '/test',
          data: { data: 'test' },
        });
        done();
      });
  });
});
