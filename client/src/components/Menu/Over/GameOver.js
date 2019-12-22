import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetBoard } from '../../../actions/boardActions';
import { setGameState, setGameRoom } from '../../../actions/mainActions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const GameOver = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(resetBoard());
    dispatch(setGameState('PREGAME'));
    dispatch(setGameRoom(undefined));
  };

  return (
    <div className={classes.root}>
      <Typography variant='body1'>Game over!</Typography>
      <Button variant='outlined' color='primary' className={classes.button} onClick={onClick}>
        Play Again
      </Button>
    </div>
  );
};

export default GameOver;
