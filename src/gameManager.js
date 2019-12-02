const games = {};

const addPlayerToGame = (game, player, board) => {
  if (!games[game]) games[game] = { players: {} };
  const players = games[game].players;
  if (Object.keys(players).length >= 2) return false; // Game is full
  players[player] = board;
  return true;
};

const removePlayerFromGame = (player) => {
  //console.log('remove player', player);
  Object.keys(games).forEach((v) => {
    const game = games[v];
    const players = game.players;
    delete players[player];
    if (Object.keys(players).length === 0) delete games[v];
  });
  //console.log('after remove player');
};

module.exports = {
  addPlayerToGame,
  removePlayerFromGame,
};
