interface ISong {
  id: number;
  duration: number;
  title: string;
}

function Song(id: number, title: string, duration: number): ISong {
  return {
    id: id,
    duration: duration,
    title: title,
  };
}

export type { ISong };
export { Song };
