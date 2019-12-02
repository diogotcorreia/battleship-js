const games = {};

const addPlayerToGame = (game, player, board) => {
  if (!games[game]) games[game] = { players: {} };
  const players = games[game].players;
  if (Object.keys(players).length >= 2) return false; // Game is full
  players[player] = board;
  return true;
};

const removePlayerFromGame = (player) => {
  Object.keys(games).forEach((v) => {
    const game = games[v];
    const players = game.players;
    delete players[player];
    if (Object.keys(players).length === 0) delete games[v];
  });
};

const isGameFull = (game) => {
  if (!games[game]) return false;
  return Object.keys(games[game].players).length >= 2;
};

module.exports = {
  addPlayerToGame,
  removePlayerFromGame,
  isGameFull,
};
