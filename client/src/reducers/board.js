import { Map } from 'immutable';

const mainReducer = (state = Map(), action) => {
  switch (action.type) {
    case 'ADD_TO_BOARD':
      return state.update(action.board, Map(), (boardDefault) =>
        action.tiles.reduce((board, v) => board.setIn([v.x, v.y], v.value), boardDefault)
      );
    default:
      return state;
  }
};

export default mainReducer;
