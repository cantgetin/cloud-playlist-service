import { Sequelize } from 'sequelize-typescript';
import { PlaylistPropsKeyValue, Song } from './database.models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: "db",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "playlist",
        logging: false,
      });
      sequelize.addModels([Song, PlaylistPropsKeyValue]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
