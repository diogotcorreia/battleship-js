import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import Grid from './Grid/Grid';
import Ships from './Ships';
import io from 'socket.io-client';

const socket = io();

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    position: 'relative',
  },
}));

const Board = () => {
  const classes = useStyles();
  useEffect(() => {
    socket.emit('my other event', { test: 'Working! :D' });
  });

  useEffect(() => {
    socket.on('news', (data) => console.log(data));
  });

  return (
    <div className={classes.root} id='board'>
      <Grid />
      <Ships />
    </div>
  );
};

export default Board;
