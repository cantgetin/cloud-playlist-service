import { Controller, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import IPlaylistService from './playlist.interface';
import { google, playlist } from '../interfaces/proto/playlist';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import PlaylistResponse = playlist.PlaylistResponse;
import { ISong, Song } from './song.interface';
import SongsResponse = playlist.SongsResponse;
import { uid } from '../utils/uid';
import AddSongRequest = playlist.AddSongRequest;
import SongResponse = playlist.SongResponse;

@Controller()
export class PlaylistController {
  constructor(
    @Inject('PlaylistService') private readonly service: IPlaylistService,
  ) {}

  @GrpcMethod('PlaylistService', 'GetAllSongs')
  getAllSongs(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): SongsResponse {
    console.log('wtf');
    try {
      return { songs: this.service.getAllSongs() };
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  // @GrpcMethod('PlaylistService','Read')
  // getSongById(
  //     data: google.protobuf.Empty,
  //     metadata: Metadata,
  //     call: ServerUnaryCall<any, any>,
  // ): PlaylistResponse {
  //     console.log('wtf')
  //     try {
  //         //this.service.play()
  //         return {status: "OK"}
  //     }
  //     catch (ex) {
  //         return {status: ex.toString()}
  //     }
  // }
  //
  // @GrpcMethod('PlaylistService','Read')
  // update(
  //     data: google.protobuf.Empty,
  //     metadata: Metadata,
  //     call: ServerUnaryCall<any, any>,
  // ): PlaylistResponse {
  //     console.log('wtf')
  //     try {
  //         //this.service.play()
  //         return {status: "OK"}
  //     }
  //     catch (ex) {
  //         return {status: ex.toString()}
  //     }
  // }
  //
  // @GrpcMethod('PlaylistService','Read')
  // delete(
  //     data: google.protobuf.Empty,
  //     metadata: Metadata,
  //     call: ServerUnaryCall<any, any>,
  // ): PlaylistResponse {
  //     console.log('wtf')
  //     try {
  //         //this.service.play()
  //         return {status: "OK"}
  //     }
  //     catch (ex) {
  //         return {status: ex.toString()}
  //     }
  // }

  @GrpcMethod('PlaylistService', 'Play')
  play(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    console.log('wtf');
    try {
      this.service.play();
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'Pause')
  pause(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      this.service.pause();
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'AddSong')
  addSong(
    data: AddSongRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      this.service.addSong(Song(uid(), data.title, data.duration));
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'Next')
  next(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      this.service.next();
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'Prev')
  prev(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      this.service.prev();
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }
}
