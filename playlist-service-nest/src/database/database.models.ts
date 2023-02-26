import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';

@Table
export class Song extends Model {
  @Column
  duration: number;
  @Column
  title: string;
}

@Table
export class Playlist extends Model {
  @BelongsTo(() => Song, { foreignKey: 'currentSongId' })
  currentSong: Song;
  @Column
  remainingTime: number;
}
