export class NoSongsException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class NoSongIsPlayingException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class SongNotFoundException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}

export class UnableToDeleteException extends Error {
  public readonly message: string;
  public constructor(private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
}
