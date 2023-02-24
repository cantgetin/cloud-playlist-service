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
import AddSongsRequest = playlist.AddSongsRequest;
import UpdateSongRequest = playlist.UpdateSongRequest;
import IdRequest = playlist.IdRequest;

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
    try {
      return { songs: this.service.getAllSongs() };
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  @GrpcMethod('PlaylistService', 'GetSongById')
  getSongById(
    data: IdRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): SongResponse {
    try {
      return this.service.getSongById(data.id);
    } catch (ex) {
      return ex;
    }
  }

  @GrpcMethod('PlaylistService', 'UpdateSong')
  updateSong(
    data: UpdateSongRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      let newSong: Omit<ISong, 'id'> = {
        duration: data.newSong.duration,
        title: data.newSong.title,
      };
      this.service.updateSong(data.id, newSong);
      return { status: 'OK' };
    } catch (ex) {
      console.log(ex);
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'DeleteSong')
  deleteSong(
    data: IdRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      this.service.deleteSong(data.id);
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'Clear')
  clear(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      this.service.clear();
      return { status: 'OK' };
    } catch (ex) {
      return { status: ex.toString() };
    }
  }

  @GrpcMethod('PlaylistService', 'Play')
  play(
    data: google.protobuf.Empty,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
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

  @GrpcMethod('PlaylistService', 'AddSongs')
  addSongs(
    data: AddSongsRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): PlaylistResponse {
    try {
      let songs: ISong[] = [];
      data.songs.forEach((song) =>
        songs.push({ title: song.title, id: uid(), duration: song.duration }),
      );

      this.service.addSongs(songs);
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
