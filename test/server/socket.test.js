require('dotenv').config();
const io = require('socket.io-client');

const socketUrl = 'http://localhost:' + process.env.PORT || '3000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Sockets', () => {
  let client = [];

  it ('should connect', (done) => {
    client[0] = io(socketUrl, options);

    client[0].on('connect', () => {
      client[0].disconnect();
      done();
    });
  });
});