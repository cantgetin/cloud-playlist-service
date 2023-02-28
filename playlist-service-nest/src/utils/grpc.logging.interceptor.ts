import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class GrpcLoggingInterceptor {
  logger: Logger = new Logger(GrpcLoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now();
    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `New GRPC request, took ${
            Date.now() - start
          }ms. Response: ${Buffer.from(JSON.stringify(data) ?? '')}`,
        );
      }),
    );
  }
}
