import { Inject, Injectable } from '@nestjs/common';
import { PlaylistPropsKeyValue, Song } from '../database/database.models';

@Injectable()
export class RepositoryService {
  constructor(
    @Inject('SONGS_REPOSITORY')
    private songsRepository: typeof Song,
    @Inject('PLAYLISTS_REPOSITORY')
    private playlistPropsRepository: typeof PlaylistPropsKeyValue,
  ) {}
  async addSong(newSong: { title: string; duration: number }): Promise<Song> {
    return this.songsRepository.create({
      title: newSong.title,
      duration: newSong.duration,
    });
  }
  async updatePlaylistRemainingTime(
    remainingTime: number,
  ): Promise<[PlaylistPropsKeyValue, boolean]> {
    return this.playlistPropsRepository.upsert({
      key: 'remainingTime',
      value: remainingTime,
    });
  }

  async updatePlaylistCurrentSongId(
    currentSongId: number,
  ): Promise<[PlaylistPropsKeyValue, boolean]> {
    return this.playlistPropsRepository.upsert({
      key: 'currentSongId',
      value: currentSongId,
    });
  }
  async getPlaylistRemainingTime(): Promise<PlaylistPropsKeyValue> {
    return this.playlistPropsRepository.findOne({
      where: { key: 'remainingTime' },
    });
  }

  async getPlaylistCurrentSongId(): Promise<PlaylistPropsKeyValue> {
    return this.playlistPropsRepository.findOne({
      where: { key: 'currentSongId' },
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
    await this.playlistPropsRepository.destroy();
    return this.songsRepository.destroy({
      where: {},
      truncate: true,
    });
  }
}
