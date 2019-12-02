import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import io from 'socket.io-client';
import { SocketProvider } from '../context/SocketContext';
import Game from './Game';

const socket = io('http://localhost:5000/'); // TODO add production stuff

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
          <Game />
        </SocketProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
