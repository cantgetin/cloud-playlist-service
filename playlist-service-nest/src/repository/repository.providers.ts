import { Song, PlaylistPropsKeyValue } from '../database/database.models';

export const songProvider = [
  {
    provide: 'SONGS_REPOSITORY',
    useValue: Song,
  },
];
export const playlistProvider = [
  {
    provide: 'PLAYLISTS_REPOSITORY',
    useValue: PlaylistPropsKeyValue,
  },
];
