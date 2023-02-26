import { Inject, Injectable } from '@nestjs/common';
import { Playlist, Song } from '../database/database.models';
import IRepositoryService from './repository.interface';

@Injectable()
export class RepositoryService implements IRepositoryService {
  constructor(
    @Inject('SONGS_REPOSITORY')
    private songsRepository: typeof Song,
    @Inject('PLAYLISTS_REPOSITORY')
    private playlistRepository: typeof Playlist,
  ) {}
  async addSong(newSong: { title: string; duration: number }): Promise<Song> {
    return this.songsRepository.create({
      title: newSong.title,
      duration: newSong.duration,
    });
  }

  async addSongs(
    songs: { title: string; duration: number }[],
  ): Promise<Song[]> {
    return this.songsRepository.bulkCreate(songs);
  }

  async updatePlaylist(
    { title, duration },
    remainingTime: number,
  ): Promise<[Playlist, boolean]> {
    return this.playlistRepository.upsert({
      song: { title: title, duration: duration },
      remainingTime: remainingTime,
    });
  }

  async deleteSong(id: number): Promise<number> {
    return this.songsRepository.destroy({ where: { _id: id } });
  }

  async getAllSongs(): Promise<Song[]> {
    return this.songsRepository.findAll<Song>();
  }

  async getSongById(id: number): Promise<Song> {
    return this.songsRepository.findByPk(id);
  }

  async updateSong(
    id: number,
    newSong: { title: string; duration: number },
  ): Promise<[affectedCount: number]> {
    return this.songsRepository.update(
      { title: newSong.title, duration: newSong.duration },
      { where: { _id: id } },
    );
  }
  async clear(): Promise<number> {
    await this.playlistRepository.destroy();
    return this.songsRepository.destroy({
      where: {},
      truncate: true,
    });
  }
}
