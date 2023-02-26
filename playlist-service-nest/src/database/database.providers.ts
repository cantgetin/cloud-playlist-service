import { Sequelize } from 'sequelize-typescript';
import { Playlist, Song } from './database.models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'playlist.db',
      });
      sequelize.addModels([Song, Playlist]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
