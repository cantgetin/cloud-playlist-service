import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Song extends Model {
  @Column
  duration: number;
  @Column
  title: string;
}

@Table
export class PlaylistPropsKeyValue extends Model {
  @PrimaryKey
  @Column
  key: string;
  @Column
  value: number;
}
