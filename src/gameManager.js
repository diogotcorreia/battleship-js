const Game = require('./lib/Game');

const games = [];

const getOrCreateGame = (name, io) => {
  let game = games.find((v) => v.id === name);
  if (!game) games.push((game = new Game(name, io)));
  return game;
};

const getGameByPlayer = (player) => {
  return games.find((v) => v.hasPlayer(player));
};

module.exports = {
  getOrCreateGame,
  getGameByPlayer,
};
