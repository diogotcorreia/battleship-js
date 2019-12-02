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
  const { pregame, room } = useSelector((state) => ({
    pregame: state.main.get('pregame', true),
    room: state.main.get('room', ''),
  }));
  if (pregame)
    return <div className={classes.root}>{room ? <LeaveRoom room={room} /> : <JoinRoom />}</div>;
  else return <div className={classes.root}></div>;
};

export default Menu;
