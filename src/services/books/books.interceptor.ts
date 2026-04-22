import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable, catchError, of } from 'rxjs';

interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

interface ErrorResponse {
  status: 'fail';
  data: {
    message: string;
  };
}

type Response<T> = SuccessResponse<T> | ErrorResponse;

@Injectable()
export class BooksInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    console.log('Before...');

    return next.handle().pipe(
      map((el: T): SuccessResponse<T> => {
        return {
          status: 'success',
          data: el,
        };
      }),
      catchError((err: unknown): Observable<Response<T>> => {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.log('Error intercepted:', message);
        return of({
          status: 'fail',
          data: {
            message,
          },
        } as Response<T>);
      }),
    );
  }
}
