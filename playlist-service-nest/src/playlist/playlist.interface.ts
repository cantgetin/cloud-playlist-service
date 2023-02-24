import {ISong} from "./song.interface";

interface IPlaylistService {

    addSong(song: ISong): void;

    play(): void;

    pause(): void;

    next(): void;

    prev(): void;
}

export default IPlaylistService