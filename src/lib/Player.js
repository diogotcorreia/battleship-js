const SlotStatus = require('./SlotStatus');

const BOARD_SIZE = process.env.BOARD_SIZE || 12;

function Player(id, ships = []) {
  this.id = id;
  this.board = generateBoardFromShips(ships);
  this.availableShips = ships;

  this.checkSunkShips = () => {
    const changes = [];
    this.availableShips = this.availableShips.filter((ship) => {
      let sunk = true;
      if (ship.rotate) {
        for (let y = ship.y; y < ship.y + ship.size; y++)
          if (this.board[ship.x][y] === SlotStatus.SHIP_NOT_FOUND) {
            sunk = false;
            break;
          }
      } else
        for (let x = ship.x; x < ship.x + ship.size; x++)
          if (this.board[x][ship.y] === SlotStatus.SHIP_NOT_FOUND) {
            sunk = false;
            break;
          }

      if (sunk) {
        for (let i = -1; i < ship.size + 1; i++)
          for (let j = -1; j < 2; j++) {
            let x = ship.x + (ship.rotate ? j : i);
            let y = ship.y + (ship.rotate ? i : j);
            if (x < 0 || y < 0 || x >= BOARD_SIZE || y >= BOARD_SIZE) continue;
            if (this.board[x][y] !== SlotStatus.UNKNOWN) continue;
            changes.push({ x, y, value: SlotStatus.WATER });
            this.board[x][y] = SlotStatus.WATER;
          }
      }

      return !sunk;
    });
    return changes;
  };
}

const generateBoardFromShips = (ships) => {
  // Create empty board based on BOARD_SIZE (default is 12)
  // board[x][y]
  const board = Array(BOARD_SIZE)
    .fill(0)
    .map((_) => Array(BOARD_SIZE).fill(0));

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
