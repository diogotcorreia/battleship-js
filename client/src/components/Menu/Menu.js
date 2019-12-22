import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import JoinRoom from './Pregame/JoinRoom';
import LeaveRoom from './Pregame/LeaveRoom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
    textAlign: 'center',
  },
}));

const Menu = () => {
  const classes = useStyles();
  const { pregame, room, turn } = useSelector((state) => ({
    pregame: state.main.get('pregame', true),
    room: state.main.get('room', ''),
    turn: state.main.get('turn', false),
  }));
  if (pregame)
    return <div className={classes.root}>{room ? <LeaveRoom room={room} /> : <JoinRoom />}</div>;
  else
    return (
      <div className={classes.root}>
        <Typography variant='body1' component='p'>
          <strong>{turn ? "It's your turn" : "Wait for you opponent's turn"}</strong>
        </Typography>
      </div>
    );
};

export default Menu;
