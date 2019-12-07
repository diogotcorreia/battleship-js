const gameManager = require('./gameManager.js');

const onJoinRoom = (socket) => (data) => {
  const game = gameManager.getOrCreateGame(data.room);
  if (game.addPlayer(socket.id, data.ships)) {
    socket.emit('join_room', { room: data.room });
    socket.join(`room-${data.room}`);
    if (game.isFull()) {
      socket.broadcast.to(`room-${data.room}`).emit('start_game');
      socket.emit('start_game');
    }
    return;
  }
  socket.emit('dispatch_error', { error: `Failed to join room "${data.room}": room is full` });
};

const onDisconnect = (socket) => () => {
  const game = gameManager.getGameByPlayer(socket.id);
  if (!game) return;
  game.removePlayer(socket.id);
  socket.emit('leave_room');
};

const exportConnection = (socket) => {
  socket.on('join_room', onJoinRoom(socket));
  socket.on('leave_room', onDisconnect(socket));
};

module.exports = exportConnection;
