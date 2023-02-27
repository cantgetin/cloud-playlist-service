import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { playlistProvider, songProvider } from './repository.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: 'RepositoryService', useClass: RepositoryService },
    ...songProvider,
    ...playlistProvider,
  ],
  exports: [
    { provide: 'RepositoryService', useClass: RepositoryService },
    ...songProvider,
    ...playlistProvider,
  ],
})
export class RepositoryModule {}
