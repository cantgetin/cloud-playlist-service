import { Controller, Inject, UsePipes } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import IPlaylistService from './playlist.interface';
import { playlist } from '../interfaces/proto/playlist';
import { ISong, Song } from './song.interface';
import { uid } from '../utils/uid';
import { JoiValidationPipe } from './validation.pipe';
import {
  addSongsRequestSchema,
  idRequestSchema,
  updateSongRequestSchema,
} from './validation.schemas';
import PlaylistResponse = playlist.PlaylistResponse;
import SongsResponse = playlist.SongsResponse;
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
  async getAllSongs(): Promise<SongsResponse> {
    try {
      let songs = await this.service.getAllSongs();
      return { songs: songs };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'GetSongById')
  @UsePipes(new JoiValidationPipe(idRequestSchema))
  async getSongById(data: IdRequest): Promise<SongResponse> {
    try {
      return await this.service.getSongById(data.id);
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'UpdateSong')
  @UsePipes(new JoiValidationPipe(updateSongRequestSchema))
  async updateSong(data: UpdateSongRequest): Promise<PlaylistResponse> {
    try {
      let newSong = {
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
  @UsePipes(new JoiValidationPipe(idRequestSchema))
  async deleteSong(data: IdRequest): Promise<PlaylistResponse> {
    try {
      this.service.deleteSong(data.id);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Clear')
  async clear(): Promise<PlaylistResponse> {
    try {
      this.service.clear();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Play')
  async play(): Promise<PlaylistResponse> {
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
  @UsePipes(new JoiValidationPipe(addSongsRequestSchema))
  addSong(data: AddSongRequest): PlaylistResponse {
    try {
      this.service.addSong(Song(uid(), data.title, data.duration));
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSongs')
  @UsePipes(new JoiValidationPipe(addSongsRequestSchema))
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
