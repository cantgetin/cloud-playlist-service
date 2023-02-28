import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

export class NoSongsException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class NoSongIsPlayingException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class SongNotFoundException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class UnableToDeleteException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class RpcNotFoundException extends RpcException {
  constructor(message: string) {
    super(message);
    this.initStatusCode(grpc.status.NOT_FOUND);
  }
  public status: number;

  private initStatusCode(statusCode) {
    this.status = statusCode;
  }
}
