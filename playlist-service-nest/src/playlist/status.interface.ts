import { ISong } from './song.interface';

interface IStatus {
  currentSong: ISong;
  isPlaying: boolean;
  remainingTime: number;
}

export type { IStatus };
