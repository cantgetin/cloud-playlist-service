import { Song } from '../database/database.models';

interface IRepositoryService {
  addSong(song: Song): void;
  addSongs(songs: Song[]): void;
  getAllSongs(): Promise<Song[]>;
  getSongById(id: number): Promise<Song>;
  updateSong(id: number, newSong: Song): void;
  deleteSong(id: number): void;
  clear(): void;
}

export default IRepositoryService;
