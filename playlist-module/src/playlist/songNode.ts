import { ISong } from './song';

interface ISongNode {
  next: ISongNode | null;
  prev: ISongNode | null;
  song: ISong;
}

function SongNode(song: ISong): ISongNode {
  return {
    next: null,
    prev: null,
    song: song,
  };
}

export type { ISongNode };
export { SongNode };
