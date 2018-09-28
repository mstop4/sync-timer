module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
  
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  
    socket.on('handshake', (msg) => {
      console.log(`User ${socket.id} sez: ${msg}`);
    });
  });
};