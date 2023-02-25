import {sequelize} from './db'
import {Song, SongNode, Playlist } from './models'


async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
    await Song.create({
      duration: 5,
      title: 'song1'
    });
    await Song.create({
      duration: 5,
      title: 'song2'
    });
    await Song.create({
      duration: 5,
      title: 'song3'
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()
