import React from 'react';
import Board from './Board/Board';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

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
      <CssBaseline />
      <Board />
    </ThemeProvider>
  );
};

export default App;
