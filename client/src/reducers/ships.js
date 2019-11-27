import { fromJS } from 'immutable';

const shipsDefault = fromJS([
  { size: 5, startX: 0, startY: 0 },
  { size: 4, startX: 0, startY: 2 },
  { size: 3, startX: 0, startY: 4 },
  { size: 3, startX: 4, startY: 4 },
  { size: 2, startX: 0, startY: 6 },
  { size: 2, startX: 3, startY: 6 },
  { size: 2, startX: 6, startY: 6 },
  { size: 1, startX: 0, startY: 8 },
  { size: 1, startX: 2, startY: 8 },
  { size: 1, startX: 4, startY: 8 },
  { size: 1, startX: 6, startY: 8 },
]);

function mainReducer(state = shipsDefault, action) {
  switch (action.type) {
    case 'SHIP_MOVE':
      let newStateMove = state.update(action.ship, (ship) =>
        ship.set('x', action.loc.x).set('y', action.loc.y)
      );
      return isValid(newStateMove, action.boardSize) ? newStateMove : state;
    case 'SHIP_ROTATE':
      let newStateRotate = state.update(action.ship, (ship) =>
        ship.update('rotate', false, (v) => !v)
      );
      return isValid(newStateRotate, action.boardSize) ? newStateRotate : state;
    default:
      return state;
  }
}

const isValid = (board, boardSize) =>
  board.every((ship1) => {
    // Don't check for ships that haven't been moved yet
    if (!ship1.has('x') && !ship1.get('rotate', false)) return true;
    // Create area where no other ship can be
    let noZone = [
      ship1.get('x', ship1.get('startX') + boardSize + 2),
      ship1.get('y', ship1.get('startY')),
    ]; // Left, Top
    noZone.push(
      noZone[0] + (ship1.get('rotate', false) ? 1 : ship1.get('size')),
      noZone[1] + (ship1.get('rotate', false) ? ship1.get('size') : 1)
    ); // Right, Bottom
    // Check if it's inside board borders
    if (noZone[0] < 0 || noZone[2] > boardSize || noZone[1] < 0 || noZone[3] > boardSize)
      return false;
    return board.every((ship2) => {
      // Don't check against the same ship
      if (ship1 === ship2) return true;
      let ship2Zone = [
        ship2.get('x', ship2.get('startX') + boardSize + 2),
        ship2.get('y', ship2.get('startY')),
      ]; // Left, Top
      ship2Zone.push(
        ship2Zone[0] + (ship2.get('rotate', false) ? 1 : ship2.get('size')),
        ship2Zone[1] + (ship2.get('rotate', false) ? ship2.get('size') : 1)
      );
      // https://stackoverflow.com/a/2752387/5758191
      return (
        ship2Zone[0] > noZone[2] ||
        ship2Zone[2] < noZone[0] ||
        ship2Zone[1] > noZone[3] ||
        ship2Zone[3] < noZone[1]
      );
    });
  });
export default mainReducer;
