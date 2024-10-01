import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface representing the unified HTTP response structure.
 *
 * @template T The type of the data included in the response.
 */
interface HttpResponse<T> {
  /** The HTTP status code of the response. */
  statusCode: number;
  /** The timestamp when the response is created. */
  timestamp: string;
  /** The request path that generated the response. */
  path: string;
  /** The actual data of the response. */
  data: T;
}

@Injectable()
/**
 * Interceptor to transform the response into a unified format.
 *
 * @template T The type of the data included in the response.
 */
export class ResponseInterceptor<T>
  implements NestInterceptor<T, HttpResponse<T>>
{
  /**
   * Intercepts the incoming request and ensures a unified response format by transforming the response.
   *
   * @param {ExecutionContext} context - The execution context of the request.
   * @param {CallHandler<T>} next - The next handler in the chain.
   * @return {Observable<HttpResponse<T>>} The transformed response with a unified format.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<HttpResponse<T>> {
    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();
    const request = context.switchToHttp().getRequest<{ url: string }>();

    return next.handle().pipe(
      map(data => ({
        statusCode: response.statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        data,
      })),
    );
  }
}
