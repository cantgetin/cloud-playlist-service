import readline from 'readline';
import Playlist from './playlist/playlist';

let playlist = new Playlist()

const readLine = readline.createInterface(
  {
    'input': process.stdin,
    'output': process.stdout,
  },
);

async function handleCommand(commandString: string) {
  switch (commandString) {
    case 'play':
      await playlist.play();
      break;
    case 'pause':
      playlist.pause();
      break;
    case 'next':
      playlist.next();
      break;
    case 'prev':
      playlist.prev();
      break;
    case 'addSong':
      await readLine.question('enter song title: ', async (title) => {
        await readLine.question('enter song duration: ', async (duration) => {
          playlist.addSong({ title: title, duration: Number(duration) } );
          init();
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

console.log('Available commands: play, pause, next, prev, addSong, exit');

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
