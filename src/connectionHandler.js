const gameManager = require('./gameManager.js');
var io;

const onJoinRoom = (socket) => (data) => {
  const game = gameManager.getOrCreateGame(data.room, io);
  if (game.addPlayer(socket.id, data.ships)) {
    socket.emit('join_room', { room: data.room });
    socket.join(`room-${data.room}`);
    if (game.isFull()) setTimeout(() => game.startGame(), 1000);
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

const onExecutePlay = (socket) => (play) => {
  const game = gameManager.getGameByPlayer(socket.id);
  if (!game) return;
  game.handlePlay(socket.id, play);
};

const exportConnection = (socket) => {
  socket.on('join_room', onJoinRoom(socket));
  socket.on('leave_room', onDisconnect(socket));
  socket.on('execute_play', onExecutePlay(socket));
};

const handleIO = (ioInstance) => {
  io = ioInstance;
  io.on('connection', exportConnection);
};

module.exports = handleIO;
