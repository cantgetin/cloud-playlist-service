import { Catch, ExceptionFilter } from '@nestjs/common';
import * as serviceEx from '../playlist/playlist.service.errors';
import * as grpcEx from './grpc.exceptions';
import { throwError } from 'rxjs';

@Catch(Error)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch<T extends Error>(ex: T) {
    if (ex instanceof grpcEx.GrpcInvalidArgumentException)
      return throwError(() =>
        new grpcEx.GrpcInvalidArgumentException(ex).getErrorWithCode(),
      );
    else if (ex instanceof serviceEx.SongNotFoundException)
      return throwError(() =>
        new grpcEx.GrpcNotFoundException(ex).getErrorWithCode(),
      );
    else if (
      ex instanceof serviceEx.UnableToDeleteException ||
      serviceEx.NoSongIsPlayingException ||
      serviceEx.NoSongsException
    )
      return throwError(() =>
        new grpcEx.GrpcFailedPreconditionException(ex).getErrorWithCode(),
      );
    else
      return throwError(() =>
        new grpcEx.GrpcInternalException(ex).getErrorWithCode(),
      );
  }
}
