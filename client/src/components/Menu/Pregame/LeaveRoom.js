import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import SocketContext from '../../../context/SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const LeaveRoom = ({ room }) => {
  const socket = useContext(SocketContext);
  const classes = useStyles();

  const onClick = () => {
    socket.emit('leave_room');
  };

  return (
    <div className={classes.root}>
      <Typography variant='body1'>
        You've joined room <strong>{room}</strong>. Waiting for opponent to connect.
      </Typography>
      <Button variant='outlined' color='primary' className={classes.button} onClick={onClick}>
        Leave Room
      </Button>
    </div>
  );
};

export default LeaveRoom;
