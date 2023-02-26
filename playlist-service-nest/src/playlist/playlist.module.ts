import { Module } from '@nestjs/common';
import PlaylistService from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [{ provide: 'PlaylistService', useClass: PlaylistService }],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
