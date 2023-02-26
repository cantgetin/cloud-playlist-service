import { Song, Playlist } from '../database/database.models';

export const songProvider = [
  {
    provide: 'SONGS_REPOSITORY',
    useValue: Song,
  },
];
export const playlistProvider = [
  {
    provide: 'PLAYLISTS_REPOSITORY',
    useValue: Playlist,
  },
];
