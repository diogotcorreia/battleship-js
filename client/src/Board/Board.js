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

const Board = ({ size, gridSize }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid size={size} gridSize={gridSize} />
      <Ships gridSize={gridSize} />
    </div>
  );
};

export default Board;
