import { Map } from 'immutable';

const mainReducer = (state = Map({ pregame: true }), action) => {
  switch (action.type) {
    case 'CHANGE_GAME_STATE':
      return state.set('pregame', action.state);
    default:
      return state;
  }
};

export default mainReducer;
