import { Song } from '../database/database.models';

interface IRepositoryService {
  addSong(song: Song): Promise<Song>;
  getAllSongs(): Promise<Song[]>;
  getSongById(id: number): Promise<Song>;
  updateSong(id: number, newSong: Song): Promise<[affectedCount: number]>;
  deleteSong(id: number): Promise<number>;
  clear(): Promise<number>;
}

export default IRepositoryService;
