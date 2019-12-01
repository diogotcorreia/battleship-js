import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grid from './Grid/Grid';
import Ships from './Ships';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    position: 'relative',
  },
}));

const Board = () => {
  const classes = useStyles();
  /*useEffect(() => {
    socket.emit('my other event', { test: 'Working! :D' });
    socket.on('news', (data) => console.log(data));
  });*/

  return (
    <div className={classes.root} id='board'>
      <Grid />
      <Ships />
    </div>
  );
};

export default Board;
