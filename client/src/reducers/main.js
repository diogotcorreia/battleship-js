import { Map } from 'immutable';

const mainReducer = (state = Map({ pregame: true }), action) => {
  switch (action.type) {
    case 'SET_PREGAME':
      return state.set('pregame', action.pregame);
    case 'SET_GAME_ROOM':
      return state.set('room', action.room);
    default:
      return state;
  }
};

export default mainReducer;
