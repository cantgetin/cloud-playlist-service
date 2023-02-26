import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { playlistProvider, songProvider } from './repository.providers';

@Module({
  imports: [DatabaseModule],
  providers: [RepositoryService, ...songProvider, ...playlistProvider],
  exports: [RepositoryService, ...songProvider, ...playlistProvider],
})
export class RepositoryModule {}
