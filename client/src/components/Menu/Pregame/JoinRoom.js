import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../../../context/SocketContext';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  inputSection: {
    margin: theme.spacing(2),
    display: 'inline-flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const JoinRoom = () => {
  const { enqueueSnackbar } = useSnackbar();
  const socket = useContext(SocketContext);
  const classes = useStyles();
  const input = React.createRef();
  const ships = useSelector((state) => state.ships);

  const onClick = () => {
    if (ships.some((v) => !v.has('x') || !v.has('y'))) {
      enqueueSnackbar('Please place all ships in the board!', { variant: 'error' });
      return;
    }
    if (!input.current.value) {
      enqueueSnackbar('Invalid room name!', { variant: 'error' });
      return;
    }
    socket.emit('join_room', {
      room: input.current.value,
      ships: ships.map((v) => ({
        x: v.get('x'),
        y: v.get('y'),
        size: v.get('size'),
        rotate: v.get('rotate', false),
      })),
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant='body1'>
        Please pick a room code to get started. Your opponent should use the same code.
      </Typography>
      <div className={classes.inputSection}>
        <TextField variant='outlined' label='Room code' inputRef={input} />
        <Button variant='outlined' color='primary' className={classes.button} onClick={onClick}>
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default JoinRoom;
