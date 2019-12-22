export const addToBoard = (board, tiles) => ({
  type: 'ADD_TO_BOARD',
  board,
  tiles,
});

export const resetBoard = () => ({
  type: 'RESET_BOARD',
});
