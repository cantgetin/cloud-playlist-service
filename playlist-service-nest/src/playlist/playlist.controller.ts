import { Controller, Inject, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import * as schemas from './validation.schemas';
import * as grpcEx from '../utils/grpc.exceptions';
import * as serviceEx from './playlist.service.errors';
import { JoiValidationPipe } from './validation.pipe';
import IPlaylistService from './playlist.interface';
import { playlist } from '../interfaces/proto/playlist';
import { ISong } from './song.interface';
import { GrpcLoggingInterceptor } from '../utils/grpc.logging.interceptor';
import { GrpcExceptionFilter } from '../utils/grpc.exceptions.filter';

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(GrpcLoggingInterceptor)
export class PlaylistController {
  constructor(
    @Inject('PlaylistService') private readonly service: IPlaylistService,
  ) {}

  @GrpcMethod('PlaylistService', 'GetAllSongs')
  async getAllSongs(): Promise<playlist.SongsResponse> {
    try {
      let songs = await this.service.getAllSongs();
      return { songs: songs };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'GetSongById')
  @UsePipes(new JoiValidationPipe(schemas.idRequestSchema))
  async getSongById(data: playlist.IdRequest): Promise<playlist.SongResponse> {
    try {
      return await this.service.getSongById(data.id);
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'UpdateSong')
  @UsePipes(new JoiValidationPipe(schemas.updateSongRequestSchema))
  async updateSong(
    data: playlist.UpdateSongRequest,
  ): Promise<playlist.PlaylistResponse> {
    try {
      let newSong = {
        duration: data.newSong.duration,
        title: data.newSong.title,
      };
      await this.service.updateSong(data.id, newSong);
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'DeleteSong')
  @UsePipes(new JoiValidationPipe(schemas.idRequestSchema))
  async deleteSong(
    data: playlist.IdRequest,
  ): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.deleteSong(data.id);
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Clear')
  async clear(): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.clear();
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Play')
  async play(): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.play();
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Pause')
  async pause(): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.pause();
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSong')
  @UsePipes(new JoiValidationPipe(schemas.songRequestSchema))
  async addSong(
    data: playlist.AddSongRequest,
  ): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.addSong(<Omit<ISong, 'id'>>{
        title: data.title,
        duration: data.duration,
      });
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'AddSongs')
  @UsePipes(new JoiValidationPipe(schemas.addSongsRequestSchema))
  async addSongs(
    data: playlist.AddSongsRequest,
  ): Promise<playlist.PlaylistResponse> {
    try {
      let songs: Omit<ISong, 'id'>[] = [];
      data.songs.forEach((song) =>
        songs.push({ title: song.title, duration: song.duration }),
      );

      await this.service.addSongs(songs);
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Next')
  async next(): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.next();
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  @GrpcMethod('PlaylistService', 'Prev')
  async prev(): Promise<playlist.PlaylistResponse> {
    try {
      await this.service.prev();
      return { status: 'OK' };
    } catch (ex) {
      this.handleServiceErrors(ex);
    }
  }

  handleServiceErrors = (ex) => {
    if (ex == serviceEx.NoSongIsPlayingException)
      throw new grpcEx.GrpcFailedPreconditionException(ex);
    else if (ex == serviceEx.NoSongsException)
      throw new grpcEx.GrpcFailedPreconditionException(ex);
    else if (ex == serviceEx.SongNotFoundException)
      throw new grpcEx.GrpcNotFoundException(ex);
    else if (ex == serviceEx.UnableToDeleteException)
      throw new grpcEx.GrpcFailedPreconditionException(ex);
    else throw new grpcEx.GrpcInternalException(ex);
  };
}
