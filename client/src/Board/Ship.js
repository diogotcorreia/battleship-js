import { makeStyles, withTheme } from '@material-ui/styles';
import React from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';

class ShipController extends React.Component {
  constructor(props) {
    super(props);
    const {
      theme: {
        board: { gridSize },
      },
      startX,
      startY,
    } = this.props;
    this.defaultPosition = { x: gridSize * (12 + startX), y: startY * gridSize };
    this.state = {
      x: this.defaultPosition.x,
      y: this.defaultPosition.y,
    };
  }

  onStop = (_, data) => {
    const {
      theme: {
        board: { gridSize, boardSize },
      },
    } = this.props;
    if (
      (data.x !== this.defaultPosition.x || data.y !== this.defaultPosition.y) &&
      (data.x > boardSize * gridSize || data.y > boardSize * gridSize)
    )
      return false;
    console.log('updateState', data);
    this.setState({ x: data.x, y: data.y });
  };

  render() {
    const {
      width,
      height,
      theme: {
        board: { gridSize },
      },
    } = this.props;
    const { x, y } = this.state;
    return (
      <Draggable
        grid={[gridSize, gridSize]}
        bounds='#board'
        defaultPosition={this.defaultPosition}
        positionOffset={{ x: gridSize, y: gridSize }}
        position={{ x, y }}
        onDrag={this.onStop}
      >
        <Ship width={width * gridSize} height={height * gridSize} />
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

const Ship = ({ width, height, className, style, ...props }) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.root, className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};

export default withTheme(ShipController);
