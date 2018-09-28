require('dotenv').config();
const io = require('socket.io-client');

const socketUrl = 'http://localhost:' + process.env.PORT_TEST || 3001;
const options = {
  transports: ['websocket'],
  forceNew: true
};

describe('Sockets (Client)', () => {
  let client = [];

  it ('should connect', (done) => {
    client[0] = io(socketUrl, options);

    client[0].on('connect', () => {
      client[0].disconnect();
      done();
    });
  });
});