import { useSnackbar } from 'notistack';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGameRoom, setTurn, setGameState } from '../actions/mainActions';
import { addToBoard } from '../actions/boardActions';
import SocketContext from '../context/SocketContext';
import Board from './Board/Board';
import Menu from './Menu/Menu';

const Game = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on('dispatch_error', (data) => {
      enqueueSnackbar(data.error, { variant: 'error' });
    });

    socket.on('join_room', (data) => {
      enqueueSnackbar(`You've joined a room: ${data.room}`, { variant: 'success' });
      dispatch(setGameRoom(data.room));
    });

    socket.on('leave_room', () => {
      enqueueSnackbar(`You've left the room`, { variant: 'info' });
      dispatch(setGameRoom(''));
    });

    socket.on('start_game', () => {
      dispatch(setGameState('PLAYING'));
    });

    socket.on('add_to_board', (board, data) => {
      dispatch(addToBoard(board, data));
    });

    socket.on('turn_data', (turn) => {
      dispatch(setTurn(turn));
    });

    socket.on('game_end', (won) => {
      dispatch(setGameState('OVER'));
      if (won) enqueueSnackbar(`You've won the game! Congratulations!`, { variant: 'success' });
      else enqueueSnackbar(`You've lost the game ;( Better luck next time...`, { variant: 'info' });
    });
  });

  return (
    <>
      <Board />
      <Menu />
    </>
  );
};

export default Game;
