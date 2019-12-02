const gameManager = require('./gameManager.js');

const onJoinRoom = (socket) => (data) => {
  if (gameManager.addPlayerToGame(data.room, socket.id, data.ships)) {
    socket.emit('join_room', { room: data.room });
    socket.join(`room-${data.room}`);
    if (gameManager.isGameFull(data.room)) {
      socket.broadcast.to(`room-${data.room}`).emit('start_game');
      socket.emit('start_game');
    }
  } else
    socket.emit('dispatch_error', { error: `Failed to join room "${data.room}": room is full` });
};

const onDisconnect = (socket) => () => {
  gameManager.removePlayerFromGame(socket.id);
  socket.emit('leave_room');
};

const exportConnection = (socket) => {
  socket.on('join_room', onJoinRoom(socket));
  socket.on('leave_room', onDisconnect(socket));
};

module.exports = exportConnection;
