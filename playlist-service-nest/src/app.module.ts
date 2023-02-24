import { Module } from '@nestjs/common';
import path from "path";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {PlaylistController} from "./app.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PLAYLIST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'playlist',
          protoPath: path.join(__dirname, '../proto/playlist.proto'),
        },
      },
    ]),
  ],
  controllers: [PlaylistController],
})
export class AppModule {}
