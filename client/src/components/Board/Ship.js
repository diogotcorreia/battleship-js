import RotateIcon from '@material-ui/icons/Rotate90DegreesCcwRounded';
import { makeStyles, useTheme } from '@material-ui/styles';
import classnames from 'classnames';
import React from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { moveShip, rotateShip } from '../../actions/shipActions';

const selector = (ship, boardSize) => {
  return {
    x: ship.get('x', ship.get('startX') + boardSize + 2),
    y: ship.get('y', ship.get('startY')),
    width: ship.get('rotate', false) ? 1 : ship.get('size', 1),
    height: ship.get('rotate', false) ? ship.get('size', 1) : 1,
  };
};

const snapToGrid = (x, y, gridSize) => ({
  x: Math.round(x / gridSize),
  y: Math.round(y / gridSize),
});

const ShipController = ({ index }) => {
  const {
    board: { gridSize, boardSize },
  } = useTheme();
  const data = useSelector((store) => selector(store.ships.get(index), boardSize, gridSize));
  const dispatch = useDispatch();

  const hideRotate = data.width === 1 && data.height === 1;
  const onRotate = () => dispatch(rotateShip(index, boardSize));
  const onStop = (_, data) =>
    dispatch(moveShip(index, snapToGrid(data.x, data.y, gridSize), boardSize));

  return (
    <Draggable
      grid={[gridSize, gridSize]}
      //bounds='#board'
      positionOffset={{ x: gridSize, y: gridSize }}
      position={{ x: data.x * gridSize, y: data.y * gridSize }}
      onStop={onStop}
      cancel='.rotate-anchor'
    >
      <Ship
        width={data.width * gridSize}
        height={data.height * gridSize}
        hideRotate={hideRotate}
        onRotate={onRotate}
      />
    </Draggable>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
  },
}));

const Ship = ({ width, height, onRotate, className, style, hideRotate, ...props }) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.root, className)}
      style={{ width, height, ...style }}
      {...props}
    >
      {!hideRotate && <RotateIcon className='rotate-anchor' onClick={onRotate} />}
    </div>
  );
};

export default ShipController;
