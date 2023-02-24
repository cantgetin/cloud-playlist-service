import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientGrpc} from "@nestjs/microservices";
import {playlist} from "../proto/playlist";
import PlaylistService = playlist.PlaylistService;

@Injectable()
export class AppService implements OnModuleInit {
  private playlistService: PlaylistService;

  constructor(@Inject('PLAYLIST_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.playlistService = this.client.getService<PlaylistService>('PlaylistService');
  }
}
