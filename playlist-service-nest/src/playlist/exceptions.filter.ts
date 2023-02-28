import { Catch, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { GrpcException } from '../utils/grpc.exceptions';

@Catch(GrpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: GrpcException) {
    return throwError(() => exception.getErrorWithCode());
  }
}
