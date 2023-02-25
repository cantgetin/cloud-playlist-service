import {Sequelize, DataTypes} from 'sequelize'
import { sequelize } from './db';

const Song = sequelize.define('Song', {
  duration: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  }
})

const SongNode = sequelize.define('SongNode', {
  song_id: {
    type: DataTypes.STRING
  },
  next_id: {
    type: DataTypes.STRING
  },
  prev_id: {
    type: DataTypes.STRING
  }
})

SongNode.belongsTo(SongNode, {
  foreignKey: "next_id",
});

SongNode.belongsTo(SongNode, {
  foreignKey: "prev_id",
});

SongNode.belongsTo(Song, {
  foreignKey: "song_id",
});

const Playlist = sequelize.define('Playlist', {
  head_id: {
    type: DataTypes.STRING
  },
  tail_id: {
    type: DataTypes.STRING
  },
  currentSong_id: {
    type: DataTypes.STRING
  },
  remainingTime: {
    type: DataTypes.NUMBER
  }
})


Playlist.belongsTo(SongNode, {
  foreignKey: "head_id",
});

Playlist.belongsTo(SongNode, {
  foreignKey: "tail_id",
});

Playlist.belongsTo(SongNode, {
  foreignKey: "currentSong_id",
});


export {Song, SongNode, Playlist}