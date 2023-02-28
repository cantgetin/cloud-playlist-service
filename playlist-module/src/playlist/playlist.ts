import IPlaylist from './playlist.interface';
import { ISongNode, SongNode } from './songNode';
import { ISong } from './song';

class Playlist implements IPlaylist {
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
    this.playTimer = null;
    this.currentSongStartTime = null;
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
    console.log('Added new song: ' + song.title);
  }

  play(): void {
    if (!this.currentSong) {
      if (this.head) {
        this.currentSong = this.head;
        this.remainingTime = this.currentSong!.song.duration;
      } else throw new Error('There are no songs in that playlist');
    }

    this.currentSongStartTime = new Date();
    console.log(`Now playing: ${this.currentSong!.song.title}`);

    if (this.playTimer) clearInterval(this.playTimer);
    this.playTimer = setInterval(() => {
      this.remainingTime!--;
      if (this.remainingTime === 0) {
        this.next();
      }
    }, 1000);
  }

  pause(): void {
    if (!this.currentSong)
      throw new Error('No song is playing');

    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
      const elapsedTime =
        new Date().getTime() - (this.currentSongStartTime?.getTime() ?? 0);
      this.remainingTime =
        this.currentSong?.song.duration! - Math.floor(elapsedTime / 1000);
      this.currentSongStartTime = null;
      console.log(
        `Paused playback at ${this.currentSong?.song.title} (${this.remainingTime}s remaining)`,
      );
    }
    else throw Error('Already on pause')
  }

  next(): void {
    if (!this.currentSong)
      throw new Error('No song is playing');
    if (!this.currentSong.next) this.currentSong = this.head;
    else this.currentSong = this.currentSong.next;
    this.currentSongStartTime = null;
    this.remainingTime = this.currentSong!.song.duration;
    this.play();
  }

  prev(): void {
    if (!this.currentSong) throw new Error('No song is playing');
    if (!this.currentSong.prev) this.currentSong = this.tail;
    else this.currentSong = this.currentSong.prev;
    this.currentSongStartTime = null;
    this.remainingTime = this.currentSong!.song.duration;
    this.play();
  }
}

export default Playlist;
