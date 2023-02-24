import IPlaylistService from "./playlist.interface";
import {ISongNode, SongNode} from "./songNode.interface";
import {ISong} from "./song.interface";


class PlaylistService implements IPlaylistService {
    head: ISongNode | null;
    tail: ISongNode | null;
    currentSong: ISongNode | null;
    currentSongStartTime: Date | null;
    playTimer: NodeJS.Timer | null;
    remainingTime: number | null;

    constructor() {
        this.head = null;
        this.tail = null;
        this.currentSong = null;
        this.currentSongStartTime = null;
        this.playTimer = null;
        this.remainingTime = null;
    }

    addSong(song: ISong): void {
        const newNode = SongNode(song);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        console.log('Added new song: ' + song.title)
    }

    play(): void {
        if (!this.currentSong) {
            this.currentSong = this.head;
            this.remainingTime = this.currentSong!.song.duration;
        }

        this.currentSongStartTime = new Date();
        console.log(`Now playing: ${this.currentSong!.song.title}`);

        if (this.playTimer) {
            clearInterval(this.playTimer);
        }
        this.playTimer = setInterval(() => {
            this.remainingTime!--;
            if (this.remainingTime === 0) {
                this.next();
            }
        }, 1000);

    }

    pause(): void {
        if (this.playTimer) {
            clearInterval(this.playTimer);
            const elapsedTime = new Date().getTime() - (this.currentSongStartTime?.getTime() ?? 0);
            this.remainingTime = this.currentSong?.song.duration! - Math.floor(elapsedTime / 1000);
            this.currentSongStartTime = null;
            console.log(`Paused playback at ${this.currentSong?.song.title} (${this.remainingTime}s remaining)`);
        }
    }

    next(): void {
        if (!this.currentSong) {
            return;
        }
        if (!this.currentSong.next) {
            this.currentSong = this.head;
        } else {
            this.currentSong = this.currentSong.next;
        }
        this.currentSongStartTime = null;
        this.remainingTime = this.currentSong!.song.duration;
        this.play();
    }

    prev(): void {
        if (!this.currentSong) {
            return;
        }
        if (!this.currentSong.prev) {
            this.currentSong = this.tail;
        } else {
            this.currentSong = this.currentSong.prev;
        }
        this.currentSongStartTime = null;
        this.remainingTime = this.currentSong!.song.duration;
        this.play();
    }
}

export default PlaylistService