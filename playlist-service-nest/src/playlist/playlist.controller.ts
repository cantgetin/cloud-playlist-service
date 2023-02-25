import { Controller, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, RpcException } from '@nestjs/microservices';
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
  getAllSongs(): SongsResponse {
    try {
      return { songs: this.service.getAllSongs() };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'GetSongById')
  getSongById(data: IdRequest): SongResponse {
    try {
      return this.service.getSongById(data.id);
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'UpdateSong')
  updateSong(data: UpdateSongRequest): PlaylistResponse {
    try {
      let newSong: Omit<ISong, 'id'> = {
        duration: data.newSong.duration,
        title: data.newSong.title,
      };
      this.service.updateSong(data.id, newSong);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'DeleteSong')
  deleteSong(data: IdRequest): PlaylistResponse {
    try {
      this.service.deleteSong(data.id);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Clear')
  clear(): PlaylistResponse {
    try {
      this.service.clear();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Play')
  play(): PlaylistResponse {
    try {
      this.service.play();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Pause')
  pause(): PlaylistResponse {
    try {
      this.service.pause();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSong')
  addSong(data: AddSongRequest): PlaylistResponse {
    try {
      this.service.addSong(Song(uid(), data.title, data.duration));
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSongs')
  addSongs(data: AddSongsRequest): PlaylistResponse {
    try {
      let songs: ISong[] = [];
      data.songs.forEach((song) =>
        songs.push({ title: song.title, id: uid(), duration: song.duration }),
      );

      this.service.addSongs(songs);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Next')
  next(): PlaylistResponse {
    try {
      this.service.next();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Prev')
  prev(): PlaylistResponse {
    try {
      this.service.prev();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }
}
