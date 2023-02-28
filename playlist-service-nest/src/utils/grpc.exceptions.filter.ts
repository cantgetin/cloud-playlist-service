import { Catch, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { GrpcException } from './grpc.exceptions';

@Catch(GrpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: GrpcException) {
    return throwError(() => exception.getErrorWithCode());
  }
}
