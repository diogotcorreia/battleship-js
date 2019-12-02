import { useSnackbar } from 'notistack';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGameRoom, setPregame } from '../actions/mainActions';
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
      dispatch(setPregame(false));
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
