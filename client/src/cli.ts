import { PlaylistClient, Song } from './playlistClient';
import * as readline from 'readline';

const client = new PlaylistClient('0.0.0.0:50051', '../proto/playlist.proto');

const readLine = readline.createInterface(
  {
    'input': process.stdin,
    'output': process.stdout,
  },
);

const cb = (error: any, response: any) => {
  if (response) console.log(`Method called, Response: ${response.status}`);
  if (error) console.log(`Method called, Error: ${error}`);
  init();
};

async function handleCommand(commandString: string) {
  switch (commandString) {
    case 'play':
      client.play(cb);
      break;
    case 'pause':
      client.pause(cb);
      break;
    case 'next':
      client.next(cb);
      break;
    case 'prev':
      client.prev(cb);
      break;
    case 'clear':
      client.clear(cb);
      break;
    case 'addSong':
      readLine.question('enter song title: ', async (title) => {
        readLine.question('enter song duration: ', async (duration) => {
          client.addSong({ title: title, duration: Number(duration) }, cb);
        });
      });
      break;
    case 'getSong':
      readLine.question('enter the id: ', async (id) => {
        client.getSong(Number(id), (err, res) => {
          if (res) console.table(res);
          if (err) console.log(`Method called, Error: ${err}`);
        });
      });
      break;
    case 'getAllSongs':
      client.getAllSongs((err, res) => {
        if (res && res.songs) res.songs.forEach((s) => console.table(s));
        if (err) console.log(`Method called, Error: ${err}`);
      });
      break;
    case 'deleteSong':
      readLine.question('enter the id: ', async (id) => {
        client.deleteSong(Number(id), cb);
      });
      break;
    case 'updateSong':
      readLine.question('enter the id: ', async (id) => {
        readLine.question('enter new song title: ', async (title) => {
          readLine.question('enter new song duration: ', async (duration) => {
            client.updateSong(Number(id), { title: title, duration: Number(duration) }, cb);
          });
        });
      });
      break;
    case 'exit':
      readLine.close();
      process.exit();
      break;
    default:
      console.log('no command found');
  }
  init();
}

function askQuestion(q: string) {
  return new Promise<string>((resolve) => {
    readLine.question(q, (ans) => {
      return resolve(ans);
    });
  });
}

console.log('Available commands: play, pause, next, prev, addSong, getSong, getAllSongs, updateSong, deleteSong, clear, exit');

function init() {
  askQuestion('>')
    .then((ans: string) => {
      handleCommand(ans);
    })
    .catch(err => {
      console.log(err);
    });
}

init();

