import {Controller, Inject} from '@nestjs/common'
import {ClientGrpc, GrpcMethod} from '@nestjs/microservices'
import IPlaylistService from "./playlist.interface";
import {google, playlist} from "../interfaces/playlist";
import {Metadata, ServerUnaryCall} from "@grpc/grpc-js";
import PlaylistResponse = playlist.PlaylistResponse;
import AddSongRequest = playlist.AddSongRequest;
import {Song} from "./song.interface";

@Controller()
export class PlaylistController {
    constructor(@Inject('PlaylistService') private readonly service: IPlaylistService) {
        console.log('init playlistcontroller')
    }
    @GrpcMethod('PlaylistService','Play')
    play(
        data: google.protobuf.Empty,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ): PlaylistResponse {
        console.log('wtf')
        try {
            this.service.play()
            return {status: "OK"}
        }
        catch (ex) {
            return {status: ex.toString()}
        }
    }

    @GrpcMethod('PlaylistService','Pause')
    pause(
        data: google.protobuf.Empty,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ): PlaylistResponse {
        try {
            this.service.pause()
            return {status: "OK"}
        }
        catch (ex) {
            return {status: ex.toString()}
        }
    }

    @GrpcMethod('PlaylistService','AddSong')
    addSong(
        data: AddSongRequest,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ): PlaylistResponse {
        try {
            this.service.addSong(Song(data.duration, data.title))
            return {status: "OK"}
        }
        catch (ex) {
            return {status: ex.toString()}
        }
    }

    @GrpcMethod('PlaylistService','Next')
    next(
        data: google.protobuf.Empty,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ): PlaylistResponse {
        try {
            this.service.next()
            return {status: "OK"}
        }
        catch (ex) {
            return {status: ex.toString()}
        }
    }

    @GrpcMethod('PlaylistService','Prev')
    prev(
        data: google.protobuf.Empty,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ): PlaylistResponse {
        try {
            this.service.prev()
            return {status: "OK"}
        }
        catch (ex) {
            return {status: ex.toString()}
        }
    }
}