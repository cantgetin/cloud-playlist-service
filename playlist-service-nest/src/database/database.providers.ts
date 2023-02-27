import { Sequelize } from 'sequelize-typescript';
import { PlaylistPropsKeyValue, Song } from './database.models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'playlist.db',
        logging: false,
      });
      sequelize.addModels([Song, PlaylistPropsKeyValue]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
