const PROTO_PATH = '../proto/playlist.proto';
const PORT = '50051'
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const readline = require("readline");
const r1 = readline.createInterface(
    {
        "input": process.stdin,
        "output": process.stdout
    }
);


const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

let playlistService = new protoDescriptor.playlist.PlaylistService('0.0.0.0:50051', grpc.credentials.createInsecure());

const increment = () => {
    let id = 0;
    return () => id++;
};

const getNextId = increment()

const play = () => playlistService.play({}, (r) => {
    console.log(r)
})

const pause = () => playlistService.pause({}, (r) => {
    console.log(r)
})
const addSong = () => {
    playlistService.addSong({title: `song ${getNextId()}`, duration: 5}, (r) => {
        console.log(r)
    })
}

const prev = () => playlistService.prev({}, (r) => {
    console.log(r)
})

const next = () => playlistService.next({}, (r) => {
    console.log(r)
})

function handleCommand(commandString) {
    switch (commandString) {
        case "play":
            play()
            break;
        case "pause":
            pause()
            break;
        case "addSong":
            addSong()
            break;
        case "next":
            next()
            break;
        case "prev":
            prev()
            break;
        case "exit":
            r1.close();
            process.exit();
            break;
        default:
            console.log('no command found')
    }
    init()
}

function askQuestion(q) {
    return new Promise((resolve, reject) => {
        r1.question(q, (ans) => {
            return resolve(ans);
        });
    });
}

console.log('available functions: play, pause, addSong, next, prev\n')
function init() {
    askQuestion('>')
        .then(ans => {
            handleCommand(ans);
        })
        .catch(err => {
            console.log(err);
        })
}

init();