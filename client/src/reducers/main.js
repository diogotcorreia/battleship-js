import { Map } from 'immutable';

const mainReducer = (state = Map({ gameState: 'PREGAME', turn: false }), action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return state.set('gameState', action.state);
    case 'SET_GAME_ROOM':
      return state.set('room', action.room);
    case 'SET_TURN':
      return state.set('turn', action.turn);
    default:
      return state;
  }
};

export default mainReducer;
