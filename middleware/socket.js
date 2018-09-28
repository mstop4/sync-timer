const { logExceptInTest } = require('../helpers/index');

module.exports = (http) => {
  const io = require('socket.io')(http);

  let clientList = [];

  io.on('connection', (socket) => {
    logExceptInTest(`User ${socket.id} connected`);
    clientList[socket.id] = socket;
  
    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      delete clientList[socket.id];
    });
  
    socket.on('handshake', (msg) => {
      logExceptInTest(`User ${socket.id} sez: ${msg}`);
    });
  });
};