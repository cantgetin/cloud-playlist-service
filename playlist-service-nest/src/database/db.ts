import {Sequelize} from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'playlist.db'
});

export {sequelize}