import { Controller, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import IPlaylistService from './playlist.interface';
import { playlist } from '../interfaces/proto/playlist';
import { ISong, Song } from './song.interface';
import {
  addSongsRequestSchema,
  idRequestSchema,
  songRequestSchema,
  updateSongRequestSchema,
} from './validation.schemas';
import PlaylistResponse = playlist.PlaylistResponse;
import SongsResponse = playlist.SongsResponse;
import AddSongRequest = playlist.AddSongRequest;
import SongResponse = playlist.SongResponse;
import AddSongsRequest = playlist.AddSongsRequest;
import UpdateSongRequest = playlist.UpdateSongRequest;
import IdRequest = playlist.IdRequest;
import { JoiValidationPipe } from './validation.pipe';

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
      await this.service.updateSong(data.id, newSong);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'DeleteSong')
  @UsePipes(new JoiValidationPipe(idRequestSchema))
  async deleteSong(data: IdRequest): Promise<PlaylistResponse> {
    try {
      await this.service.deleteSong(data.id);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Clear')
  async clear(): Promise<PlaylistResponse> {
    try {
      await this.service.clear();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Play')
  async play(): Promise<PlaylistResponse> {
    try {
      await this.service.play();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Pause')
  async pause(): Promise<PlaylistResponse> {
    try {
      await this.service.pause();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSong')
  @UsePipes(new JoiValidationPipe(songRequestSchema))
  async addSong(data: AddSongRequest): Promise<PlaylistResponse> {
    try {
      await this.service.addSong(<Omit<ISong, 'id'>>{
        title: data.title,
        duration: data.duration,
      });
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSongs')
  @UsePipes(new JoiValidationPipe(addSongsRequestSchema))
  async addSongs(data: AddSongsRequest): Promise<PlaylistResponse> {
    try {
      let songs: Omit<ISong, 'id'>[] = [];
      data.songs.forEach((song) =>
        songs.push({ title: song.title, duration: song.duration }),
      );

      await this.service.addSongs(songs);
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Next')
  async next(): Promise<PlaylistResponse> {
    try {
      await this.service.next();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Prev')
  async prev(): Promise<PlaylistResponse> {
    try {
      await this.service.prev();
      return { status: 'OK' };
    } catch (ex) {
      throw new RpcException(ex);
    }
  }
}
