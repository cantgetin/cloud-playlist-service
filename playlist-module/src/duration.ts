import Playlist from './playlist/playlist';
import { Song } from './playlist/song';

// Duration test

let playlist1 = new Playlist();

let song1 = Song('Song 1 with duration of 5 seconds', 5);
let song2 = Song('Song 2 with duration of 7 seconds', 7);


playlist1.addSong(song1);
playlist1.addSong(song2);
playlist1.play();

let playStartDate = new Date();

let currentSong = song1;


let timer = setInterval(function() {
  if (playlist1!.currentSong!.song != currentSong) {
    console.log(new Date().getTime() - playStartDate.getTime());
    playStartDate = new Date();
    currentSong = currentSong == song1 ? song2 : song1;
  }
}, 500);
