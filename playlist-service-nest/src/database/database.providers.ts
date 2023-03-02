import { Sequelize } from 'sequelize-typescript';
import { PlaylistPropsKeyValue, Song } from './database.models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: false,
      });
      sequelize.addModels([Song, PlaylistPropsKeyValue]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
