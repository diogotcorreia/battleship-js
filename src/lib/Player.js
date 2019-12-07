const SlotStatus = require('./SlotStatus');

function Player(id, ships = []) {
  this.id = id;
  this.board = generateBoardFromShips(ships);
}

const generateBoardFromShips = (ships) => {
  // Create empty board based on BOARD_SIZE (default is 12)
  // board[x][y]
  const board = Array(process.env.BOARD_SIZE || 12)
    .fill(0)
    .map((_) => Array(process.env.BOARD_SIZE || 12).fill(0));

  ships.forEach((ship) => {
    if (ship.rotate)
      for (let y = ship.y; y < ship.y + ship.size; y++)
        board[ship.x][y] = SlotStatus.SHIP_NOT_FOUND;
    else
      for (let x = ship.x; x < ship.x + ship.size; x++)
        board[x][ship.y] = SlotStatus.SHIP_NOT_FOUND;
  });

  return board;
};

module.exports = Player;
