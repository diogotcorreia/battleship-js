import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Board from './Board/Board';
import Menu from './Menu/Menu';
import { SocketProvider } from '../context/SocketContext';
import io from 'socket.io-client';
import { SnackbarProvider } from 'notistack';

const socket = io();

const theme = createMuiTheme({
  palette: {
    primary: { main: '#039be5' },
    secondary: { main: '#d32f2f' },
    type: 'dark',
  },
  board: {
    boardSize: 10,
    gridSize: 48,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <SocketProvider value={socket}>
          <CssBaseline />
          <Board />
          <Menu />
        </SocketProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
