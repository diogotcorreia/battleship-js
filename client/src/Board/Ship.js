import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
  },
}));

const Ship = ({ width, height, startX, startY, gridSize }) => {
  const classes = useStyles();
  return (
    <Draggable
      grid={[gridSize, gridSize]}
      defaultPosition={{ x: gridSize * 12 + startX * gridSize, y: startY * gridSize }}
      positionOffset={{ x: gridSize, y: gridSize }}
    >
      <div
        className={classes.root}
        style={{ width: width * gridSize, height: height * gridSize }}
      />
    </Draggable>
  );
};

export default Ship;
