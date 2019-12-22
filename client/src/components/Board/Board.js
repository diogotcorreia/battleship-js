import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
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
  const pregame = useSelector((store) => store.main.get('pregame', true));

  return (
    <div className={classes.root} id='board'>
      <Grid />
      {pregame && <Ships />}
    </div>
  );
};

export default Board;
