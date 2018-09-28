module.exports = (http) => {
  const io = require('socket.io')(http);

  let clientList = [];

  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    clientList[socket.id] = socket;
  
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
      delete clientList[socket.id];
    });
  
    socket.on('handshake', (msg) => {
      console.log(`User ${socket.id} sez: ${msg}`);
    });
  });
};