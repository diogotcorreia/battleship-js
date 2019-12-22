import { makeStyles, useTheme } from '@material-ui/styles';
import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { Map } from 'immutable';

const useStyles = makeStyles((theme) => ({
  root: {
    borderSpacing: 0,
  },
  square: {
    width: theme.board.gridSize,
    height: theme.board.gridSize,
  },
  grey: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const colorMap = {
  1: '#fc8c03',
  2: '#039be5',
  3: '#f53307',
  4: '#07f596',
};

const BoardContent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const board = useSelector((state) => state.board.get('own', Map()));
  return (
    <table className={classes.root}>
      <tbody>{generateBoard(theme.board.boardSize, classes, board)}</tbody>
    </table>
  );
};

const generateBoard = (size, classes, board) => {
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
      children.push(
        <td
          className={classnames(classes.square, { [classes.grey]: k % 2 === i % 2 })}
          key={`box-${i}-${k}`}
          style={{ backgroundColor: colorMap[board.getIn([k - 1, i - 1], 0)] }}
        />
      );
    }
    result.push(<tr key={`row-${i}`}>{children}</tr>);
  }
  return result;
};

export default BoardContent;
