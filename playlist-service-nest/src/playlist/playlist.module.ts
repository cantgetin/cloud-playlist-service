import { Module } from '@nestjs/common';
import PlaylistService from './playlist.service';
import { PlaylistController } from './playlist.controller';
@Module({
  imports: [],
  providers: [{ provide: 'PlaylistService', useClass: PlaylistService }],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
