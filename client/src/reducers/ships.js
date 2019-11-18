import { fromJS } from 'immutable';

const shipsDefault = fromJS([
  { size: 5, startX: 0, startY: 0 },
  { size: 4, startX: 0, startY: 2 },
  { size: 3, startX: 0, startY: 4 },
  { size: 3, startX: 4, startY: 4 },
  { size: 2, startX: 0, startY: 6 },
]);

function mainReducer(state = shipsDefault, action) {
  switch (action.type) {
    case 'SET_POSITION':
      return state.update(action.ship, (ship) => ship.set('x', action.x).set('y', action.y));
    default:
      return state;
  }
}

export default mainReducer;
