import { Module } from '@nestjs/common';
import {PlaylistModule} from "./playlist/playlist.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from "path";

@Module({
  imports: [PlaylistModule],
})
export class AppModule {}
