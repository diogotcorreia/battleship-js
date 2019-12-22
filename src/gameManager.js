const Game = require('./lib/Game');

const games = [];

const getOrCreateGame = (name, io) => {
  let game = games.find((v) => v.id === name);
  if (!game) games.push((game = new Game(name, io, removeGame)));
  return game;
};

const getGameByPlayer = (player) => {
  return games.find((v) => v.hasPlayer(player));
};

const removeGame = (name) => {
  let game = games.findIndex((v) => v.id === name);
  if (game !== -1) games.splice(game, 1);
};

module.exports = {
  getOrCreateGame,
  getGameByPlayer,
};
