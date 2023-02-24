import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { google, playlist } from './interfaces/playlist';
import PlaylistResponse = playlist.PlaylistResponse;
import AddSongRequest = playlist.AddSongRequest;

@Controller()
export class PlaylistController {
  @GrpcMethod('PlaylistService')
  play(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService')
  pause(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService')
  addSong(
    data: AddSongRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService')
  next(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService')
  prev(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    return { status: 'OK' };
  }
}
