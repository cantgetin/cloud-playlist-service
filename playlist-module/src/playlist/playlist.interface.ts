import { ISong } from './song';

interface IPlaylist {
  addSong(song: Omit<ISong, 'id'>): void;
  play(): void;
  pause(): void;
  next(): void;
  prev(): void;
}

export default IPlaylist;