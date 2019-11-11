import RotateIcon from '@material-ui/icons/Rotate90DegreesCcwRounded';
import { makeStyles, withTheme } from '@material-ui/styles';
import classnames from 'classnames';
import React from 'react';
import Draggable from 'react-draggable';

class ShipController extends React.Component {
  constructor(props) {
    super(props);
    const {
      theme: {
        board: { gridSize, boardSize },
      },
      startX,
      startY,
      size,
    } = this.props;
    this.defaultPosition = { x: gridSize * (boardSize + 2 + startX), y: startY * gridSize };
    this.state = {
      x: this.defaultPosition.x,
      y: this.defaultPosition.y,
      width: size,
      height: 1,
    };
  }

  snapToGrid = (x, y) => {
    const gridSize = this.props.theme.board.gridSize;
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize,
    };
  };

  onRotate = () => {
    this.setState({ width: this.state.height, height: this.state.width });
  };

  onStop = (_, data) => {
    const {
      theme: {
        board: { gridSize, boardSize },
      },
    } = this.props;
    const { x, y, width, height } = this.state;
    const pos = this.snapToGrid(data.x, data.y);
    if (
      (pos.x !== this.defaultPosition.x || pos.y !== this.defaultPosition.y) &&
      (pos.x > (boardSize - width) * gridSize || pos.y > (boardSize - height) * gridSize)
    ) {
      this.setState(this.snapToGrid(x, y));
      return;
    }
    this.setState(pos);
  };

  render() {
    const {
      theme: {
        board: { gridSize },
      },
    } = this.props;
    const { x, y, width, height } = this.state;
    return (
      <Draggable
        grid={[gridSize, gridSize]}
        bounds='#board'
        defaultPosition={this.defaultPosition}
        positionOffset={{ x: gridSize, y: gridSize }}
        position={{ x, y }}
        onStop={this.onStop}
        cancel='.rotate-anchor'
      >
        <Ship width={width * gridSize} height={height * gridSize} onRotate={this.onRotate} />
      </Draggable>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
  },
}));

const Ship = ({ width, height, onRotate, className, style, ...props }) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.root, className)}
      style={{ width, height, ...style }}
      {...props}
    >
      <RotateIcon className='rotate-anchor' onClick={onRotate} />
    </div>
  );
};

export default withTheme(ShipController);
