import { ISong } from './song.interface';

interface IPlaylistService {
  addSong(song: ISong): void;
  addSongs(songs: ISong[]): void;
  play(): void;
  pause(): void;
  next(): void;
  prev(): void;
  getAllSongs(): ISong[];
  getSongById(id: number): ISong;
  updateSong(id: number, newSong: Omit<ISong, 'id'>): void;
  deleteSong(id: number): void;
  clear(): void;
}

export default IPlaylistService;
