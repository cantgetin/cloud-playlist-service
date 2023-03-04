import {
  Controller,
  Inject,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import * as schemas from './validation.schemas';
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
    return { songs: await this.service.getAllSongs() };
  }

  @GrpcMethod('PlaylistService', 'GetSongById')
  @UsePipes(new JoiValidationPipe(schemas.idRequestSchema))
  async getSongById(data: playlist.IdRequest): Promise<playlist.SongResponse> {
    return await this.service.getSongById(data.id);
  }

  @GrpcMethod('PlaylistService', 'UpdateSong')
  @UsePipes(new JoiValidationPipe(schemas.updateSongRequestSchema))
  async updateSong(
    data: playlist.UpdateSongRequest,
  ): Promise<playlist.PlaylistResponse> {
    const newSong = {
      duration: data.newSong.duration,
      title: data.newSong.title,
    };
    await this.service.updateSong(data.id, newSong);
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'DeleteSong')
  @UsePipes(new JoiValidationPipe(schemas.idRequestSchema))
  async deleteSong(
    data: playlist.IdRequest,
  ): Promise<playlist.PlaylistResponse> {
    await this.service.deleteSong(data.id);
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'Clear')
  async clear(): Promise<playlist.PlaylistResponse> {
    await this.service.clear();
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'Play')
  async play(): Promise<playlist.PlaylistResponse> {
    await this.service.play();
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'Pause')
  async pause(): Promise<playlist.PlaylistResponse> {
    await this.service.pause();
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'AddSong')
  @UsePipes(new JoiValidationPipe(schemas.songRequestSchema))
  async addSong(
    data: playlist.AddSongRequest,
  ): Promise<playlist.PlaylistResponse> {
    await this.service.addSong(<Omit<ISong, 'id'>>{
      title: data.title,
      duration: data.duration,
    });
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'AddSongs')
  @UsePipes(new JoiValidationPipe(schemas.addSongsRequestSchema))
  async addSongs(
    data: playlist.AddSongsRequest,
  ): Promise<playlist.PlaylistResponse> {
    const songs: Omit<ISong, 'id'>[] = [];
    data.songs.forEach((song) =>
      songs.push({ title: song.title, duration: song.duration }),
    );

    await this.service.addSongs(songs);
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'Next')
  async next(): Promise<playlist.PlaylistResponse> {
    await this.service.next();
    return { status: 'OK' };
  }

  @GrpcMethod('PlaylistService', 'Prev')
  async prev(): Promise<playlist.PlaylistResponse> {
    await this.service.prev();
    return { status: 'OK' };
  }
}
