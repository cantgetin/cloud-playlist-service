import { Module } from '@nestjs/common';
import { PlaylistModule } from './playlist/playlist.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './repository/repository.module';
@Module({
  imports: [ConfigModule.forRoot(), PlaylistModule],
})
export class AppModule {}
