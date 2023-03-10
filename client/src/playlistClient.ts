import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ServiceError } from '@grpc/grpc-js';

export interface Song {
  duration: number;
  title: string;
}

export interface SongRes {
  id?: number;
  duration?: number;
  title?: string;
}

export interface SongsRes {
  songs?: SongRes[];
}

export interface ResponseObject {
  status: string;
}

export class PlaylistClient {
  serviceUrl: string;
  protoPath: string;
  playlistService: any;

  constructor(serviceUrl: string, protoPath: string) {
    this.serviceUrl = serviceUrl;
    this.protoPath = protoPath;

    const packageDefinition = protoLoader.loadSync(
      this.protoPath,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });

    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    // @ts-ignore
    this.playlistService = new protoDescriptor.playlist.PlaylistService(this.serviceUrl, grpc.credentials.createInsecure());
  }

  play(callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.play({}, callback);
  }

  pause(callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.pause({}, callback);
  }

  next(callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.next({}, callback);
  }

  prev(callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.prev({}, callback);
  }

  addSong(song: Song, callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.addSong({ ...song }, callback);
  }

  addSongs(songs: Song[], callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.addSong({ songs: [...songs] }, callback);
  }

  getAllSongs(callback: (error: ServiceError, response: SongsRes) => void) {
    this.playlistService.getAllSongs({}, callback);
  }

  getSong(id: number, callback: (error: ServiceError, response: SongRes) => void) {
    this.playlistService.getSong({ id: id }, callback);
  }

  updateSong(id: number, newSong: Song, callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.updateSong({ id: id, newSong: { ...newSong } }, callback);
  }

  deleteSong(id: number, callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.deleteSong({ id: id }, callback);
  }

  clear(callback: (error: ServiceError, response: ResponseObject) => void) {
    this.playlistService.clear({}, callback);
  }
}