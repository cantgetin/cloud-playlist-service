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
    if (!this.currentSong) throw new Error('No song is playing');
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
    if (!this.currentSong) throw new Error('No song is playing');
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

      let song = songs.find((el) => el.id == id);
      if (song) return song;
      else throw new Error('Song with provided ID was not found');
    } else throw new Error('There are no songs in that playlist');
  }

  updateSong(id: number, newSong: Omit<ISong, 'id'>): void {
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

        if (this.currentSong && this.currentSong.song.id == id) {
          let timeThatSongPlayed: number =
            this.currentSong.song.duration - this.remainingTime;
          this.remainingTime = song.duration - timeThatSongPlayed;
        }
      } else throw new Error('Song with provided ID was not found');
    }
  }

  deleteSong(id: number): void {
    if (this.currentSong && this.currentSong.song.id == id)
      throw new Error("You can't delete the song that is currently playing.");
    if (this.head) {
      let songFound = false;
      const deleteNode = (node: ISongNode | null): ISongNode | null => {
        if (!node) return null;
        if (node.song.id === id) {
          songFound = true;
          if (node === this.currentSong)
            throw new Error(
              "You can't delete the song that is currently playing.",
            );
          if (node === this.head) this.head = node.next;
          if (node === this.tail) this.tail = node.prev;
          if (node.prev) node.prev.next = node.next;
          if (node.next) node.next.prev = node.prev;
          console.log(`Deleted song: ${node.song.title}`);
          return node.next;
        }
        node.next = deleteNode(node.next);
        return node;
      };

      const newHead = deleteNode(this.head);
      if (!songFound)
        throw new Error(`Song with ID ${id} not found in playlist`);
      this.head = newHead;
    }
  }
  clear(): void {
    this.head = null;
    this.tail = null;
    this.currentSong = null;
    this.currentSongStartTime = null;
    this.playTimer = null;
    this.remainingTime = null;
  }
}

export default PlaylistService;
