interface ISong {
  duration: number;
  title: string;
}

function Song(title: string, duration: number): ISong {
  return <ISong>{
    duration: duration,
    title: title
  };
}

export type {ISong};
export {Song}
