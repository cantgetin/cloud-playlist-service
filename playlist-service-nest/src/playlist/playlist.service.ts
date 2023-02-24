import IPlaylistService from './playlist.interface';
import { ISongNode, SongNode } from './songNode.interface';
import { ISong } from './song.interface';

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
    console.log('Added new song: ' + song.title);
  }

  addSongs(songs: ISong[]): void {
    songs.forEach((song) => this.addSong(song));
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
      const elapsedTime =
        new Date().getTime() - (this.currentSongStartTime?.getTime() ?? 0);
      this.remainingTime =
        this.currentSong?.song.duration! - Math.floor(elapsedTime / 1000);
      this.currentSongStartTime = null;
      console.log(
        `Paused playback at ${this.currentSong?.song.title} (${this.remainingTime}s remaining)`,
      );
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

  getAllSongs(): ISong[] {
    if (this.head) {
      let songs: ISong[] = [];
      function addSongs(node: ISongNode) {
        songs.push(node.song);
        if (node.next) addSongs(node.next);
      }
      addSongs(this.head);

      return songs;
    }
    return [];
  }

  getSongById(id: number): ISong {
    if (this.head) {
      let songs: ISong[] = [];
      function addSongs(node: ISongNode) {
        songs.push(node.song);
        if (node.next) addSongs(node.next);
      }
      addSongs(this.head);

      return songs.find((el) => el.id == id);
    }
    return null;
  }

  updateSong(id: number, newSong: Omit<ISong, 'id'>): boolean {
    if (this.head) {
      let songs: ISong[] = [];
      function addSongs(node: ISongNode) {
        songs.push(node.song);
        if (node.next) addSongs(node.next);
      }
      addSongs(this.head);

      let song = songs.find((el) => el.id == id);
      if (song) {
        song.duration = newSong.duration;
        song.title = newSong.title;

        // if this song is currently playing recalculate remainingTime
        // current song duration - remainingTime = time that song played
        if (this.currentSong && this.currentSong.song.id == id) {
          let timeThatSongPlayed: number =
            this.currentSong.song.duration - this.remainingTime;
          this.remainingTime = song.duration - timeThatSongPlayed;
        }

        return true;
      } else return false;
    }
  }

  deleteSong(id: number): boolean {
    if (this.currentSong && this.currentSong.song.id == id) return false;

    if (this.head) {
      function deleteSong(node: ISongNode) {
        if (node.song.id == id) {
          if (node.next && node.prev) {
            node.prev.next = node.next;
          } else if (node.next && !node.prev) {
            node.next.prev = null;
          } else if (!node.next && node.prev) {
            node.prev.next = null;
          }
          return true;
        }
        if (node.next) deleteSong(node.next);
      }
      deleteSong(this.head);
      return false;
    }
  }
  clear(): boolean {
    try {
      this.head = null;
      this.tail = null;
      this.currentSong = null;
      this.currentSongStartTime = null;
      this.playTimer = null;
      this.remainingTime = null;
      return true;
    } catch {
      return false;
    }
  }
}

export default PlaylistService;
