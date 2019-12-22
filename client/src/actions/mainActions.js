export const setGameState = (state) => ({
  type: 'SET_GAME_STATE',
  state,
});

export const setGameRoom = (room) => ({
  type: 'SET_GAME_ROOM',
  room,
});

export const setTurn = (turn) => ({
  type: 'SET_TURN',
  turn,
});
