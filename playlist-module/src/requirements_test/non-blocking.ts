import Playlist from '../playlist/playlist';
import { Song } from '../playlist/song';

// non-blocking test

let playlist1 = new Playlist();

let song1 = Song('Song 1 with duration of 5 seconds', 5);
let song2 = Song('Song 2 with duration of 7 seconds', 7);


playlist1.addSong(song1);
playlist1.addSong(song2);
playlist1.play();

let playStartDate = new Date();

setTimeout(() => {
  playlist1.addSong(Song('Song 3', 10))
  playlist1.addSong(Song('Song 4', 10))
  playlist1.addSong(Song('Song 5', 10))
}, 2000)

setTimeout(()=> {
  playlist1.pause()
}, 3000)

setTimeout(() => {
  playlist1.play()
}, 4000)

// should be 6000 ms

let timer = setInterval(function() {
  if (playlist1!.currentSong!.song != song1) {
    console.log(new Date().getTime() - playStartDate.getTime());
    clearInterval(timer)
  }
}, 100);
