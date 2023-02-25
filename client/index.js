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

const play = () => playlistService.play({}, (error, response) => {
    console.log(response.status)
})

const pause = () => playlistService.pause({}, (error, response) => {
    console.log(response.status)
})
const addSong = () => {
    playlistService.addSong({title: `song ${getNextId()}`, duration: 5}, (error, response) => {
        console.log(response.status)
    })
}
const getAllSongs = () => {
    playlistService.getAllSongs({}, (error, response) => {
        console.log(response)
    })
}

const prev = () => playlistService.prev({}, (error, response) => {
    console.log(response.status)
})

const next = () => playlistService.next((error, response) => {
    console.log(response.status)
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
        case "getAllSongs":
            getAllSongs()
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