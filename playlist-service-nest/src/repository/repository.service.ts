import { Inject, Injectable } from '@nestjs/common';
import { PlaylistPropsKeyValue, Song } from '../database/database.models';
import IRepositoryService from './repository.interface';

@Injectable()
export class RepositoryService implements IRepositoryService {
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

  async updatePlaylistPlayingState(
    isPlaying: boolean,
  ): Promise<[PlaylistPropsKeyValue, boolean]> {
    const isPlayingInt = isPlaying ? 1 : 0;

    return this.playlistPropsRepository.upsert({
      key: 'isPlaying',
      value: isPlayingInt,
    });
  }
  async getPlaylistProps(): Promise<{
    remainingTime: number;
    currentSongId: number;
    isPlaying: boolean;
  }> {
    const props = await this.playlistPropsRepository.findAll();
    return {
      remainingTime: props.find((p) => p.key == 'remainingTime').value,
      currentSongId: props.find((p) => p.key == 'currentSongId').value,
      isPlaying: props.find((p) => p.key == 'isPlaying').value == 1,
    };
  }

  async deleteSong(id: number): Promise<number> {
    return this.songsRepository.destroy({ where: { id: id } });
  }

  async getAllSongs(): Promise<Song[]> {
    return this.songsRepository.findAll<Song>();
  }

  async getSong(id: number): Promise<Song> {
    return this.songsRepository.findByPk(id);
  }

  async updateSong(
    id: number,
    newSong: { title: string; duration: number },
  ): Promise<[affectedCount: number]> {
    return this.songsRepository.update(
      { title: newSong.title, duration: newSong.duration },
      { where: { id: id } },
    );
  }

  async clear(): Promise<number> {
    await this.playlistPropsRepository.destroy({
      where: {},
      truncate: true,
    });
    return this.songsRepository.destroy({
      where: {},
      truncate: true,
    });
  }
}
