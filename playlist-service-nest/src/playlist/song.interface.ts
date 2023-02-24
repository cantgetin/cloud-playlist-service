interface ISong {
    duration: number;
    title: string;
}

function Song(duration: number, title: string): ISong {
    return {
        duration: duration,
        title: title
    }
}

export type {ISong};
export {Song};