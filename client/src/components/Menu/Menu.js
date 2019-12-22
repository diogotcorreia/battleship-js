import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import JoinRoom from './Pregame/JoinRoom';
import LeaveRoom from './Pregame/LeaveRoom';
import GameOver from './Over/GameOver';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
    textAlign: 'center',
  },
}));

const Menu = () => {
  const classes = useStyles();
  const { gameState, room, turn } = useSelector((state) => ({
    gameState: state.main.get('gameState', 'PREGAME'),
    room: state.main.get('room', ''),
    turn: state.main.get('turn', false),
  }));
  if (gameState === 'PREGAME')
    return <div className={classes.root}>{room ? <LeaveRoom room={room} /> : <JoinRoom />}</div>;
  else if (gameState === 'PLAYING')
    return (
      <div className={classes.root}>
        <Typography variant='body1' component='p'>
          <strong>{turn ? "It's your turn" : "Wait for you opponent's turn"}</strong>
        </Typography>
      </div>
    );
  else if (gameState === 'OVER')
    return (
      <div className={classes.root}>
        <GameOver />
      </div>
    );
};

export default Menu;
