import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import classnames from 'classnames';
import { Map } from 'immutable';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../../../context/SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    borderSpacing: 0,
    marginRight: theme.board.gridSize * 2,
    tableLayout: 'fixed',
    width: 'max-content',
  },
  square: {
    width: theme.board.gridSize,
    height: theme.board.gridSize,
  },
  grey: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
  },
}));

const colorMap = {
  1: '#fc8c03',
  2: '#039be5',
  3: '#f53307',
};

const BoardContent = ({ boardName, clickable, title }) => {
  const socket = useContext(SocketContext);
  const classes = useStyles();
  const theme = useTheme();
  const [board, turn] = useSelector((state) => [
    state.board.get(boardName, Map()),
    state.main.get('turn', false),
  ]);
  const onTileClick = (x, y) => () => {
    socket.emit('execute_play', { x, y });
  };
  return (
    <div>
      {title && (
        <Typography variant='h6' component='p' className={classes.title}>
          {title}
        </Typography>
      )}
      <table className={classes.root}>
        <tbody>
          {generateBoard(theme.board.boardSize, classes, board, clickable && turn, onTileClick)}
        </tbody>
      </table>
    </div>
  );
};

const generateBoard = (size, classes, board, clickable, onTileClick) => {
  let result = [];
  for (let i = 0; i <= size; i++) {
    let children = [];
    for (let k = 0; k <= size; k++) {
      if (i === 0) {
        children.push(
          <th className={classes.square} key={`header-${k}`}>
            {k === 0 ? '' : String.fromCharCode(64 + k)}
          </th>
        );
        continue;
      }
      if (k === 0) {
        children.push(
          <th className={classes.square} key={`sheader-${i}`}>
            {i}
          </th>
        );
        continue;
      }
      let clickableTile = clickable && board.getIn([k - 1, i - 1], 0) === 0;
      children.push(
        <td
          onClick={clickableTile ? onTileClick(k - 1, i - 1) : undefined}
          className={classnames(classes.square, { [classes.grey]: k % 2 === i % 2 })}
          key={`box-${i}-${k}`}
          style={{
            backgroundColor: colorMap[board.getIn([k - 1, i - 1], 0)],
            cursor: clickableTile ? 'pointer' : 'default',
          }}
        />
      );
    }
    result.push(<tr key={`row-${i}`}>{children}</tr>);
  }
  return result;
};

export default BoardContent;
