import { PlaylistClient, Song } from './playlistClient';
import * as readline from 'readline';

const client = new PlaylistClient(50051, '../proto/playlist.proto');

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
      await client.play(cb);
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
      await readLine.question('enter song title: ', async (title) => {
        await readLine.question('enter song duration: ', async (duration) => {
          await client.addSong({ title: title, duration: Number(duration) }, cb);
        });
      });
      break;
    case 'addSongs':
      readLine.question('how many songs you would like to add?: ', async (count) => {
        let songs: Song[] = [];
        for (let i = 0; i < Number(count); i++) {
          await readLine.question('enter song title: ', async (title) => {
            await readLine.question('enter song duration: ', (duration) => {
              songs.push({ title: title, duration: Number(duration) });
            });
          });
        }
        await client.addSongs(songs, cb);
      });
      break;
    case 'getSongById':
      await readLine.question('enter the id: ', async (id) => {
        let song = await client.getSongById(Number(id), cb);
        console.table(song);
      });
      break;
    case 'getAllSongs':
      let res = await client.getAllSongs(cb);
      res.songs.forEach((s) => console.table(s));
      break;
    case 'deleteSong':
      await readLine.question('enter the id: ', async (id) => {
        await client.deleteSong(Number(id), cb);
      });
      break;
    case 'updateSong':
      await readLine.question('enter the id: ', async (id) => {
        await readLine.question('enter new song title: ', async (title) => {
          await readLine.question('enter new song duration: ', async (duration) => {
            await client.updateSong(Number(id), { title: title, duration: Number(duration) }, cb);
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

console.log('Available commands: play, pause, next, prev, addSong, addSongs, getSongById, getAllSongs, updateSong, deleteSong, clear, exit');

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

