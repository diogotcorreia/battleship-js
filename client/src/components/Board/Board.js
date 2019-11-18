import React from 'react';
import Grid from './Grid/Grid';
import Ships from './Ships';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    position: 'relative',
  },
}));

const Board = () => {
  const classes = useStyles();
  return (
    <div className={classes.root} id='board'>
      <Grid />
      <Ships />
    </div>
  );
};

export default Board;
