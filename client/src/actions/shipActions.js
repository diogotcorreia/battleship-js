export const rotateShip = (id, boardSize) => ({
  type: 'SHIP_ROTATE',
  ship: id,
  boardSize,
});

export const moveShip = (id, loc, boardSize) => ({
  type: 'SHIP_MOVE',
  ship: id,
  loc,
  boardSize,
});
