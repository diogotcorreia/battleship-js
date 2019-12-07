const Game = require('./lib/Game');

const games = [];

const getOrCreateGame = (name) => {
  let game = games.find((v) => v.id === name);
  if (!game) games.push((game = new Game(name)));
  return game;
};

const getGameByPlayer = (player) => {
  return games.find((v) => v.hasPlayer(player));
};

module.exports = {
  getOrCreateGame,
  getGameByPlayer,
};
