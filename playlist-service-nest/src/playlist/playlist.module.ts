import {Module} from '@nestjs/common'
import PlaylistService from "./playlist.service";
import {PlaylistController} from "./playlist.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from "path";
@Module({
    imports: [],
    providers: [{provide: 'PlaylistService', useClass: PlaylistService}],
    controllers: [PlaylistController],
})
export class PlaylistModule {}