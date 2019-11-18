import { makeStyles, useTheme } from '@material-ui/styles';
import classnames from 'classnames';
import React from 'react';

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

const BoardContent = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <table className={classes.root}>
      <tbody>{generateBoard(theme.board.boardSize, classes)}</tbody>
    </table>
  );
};

const generateBoard = (size, classes) => {
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
        />
      );
    }
    result.push(<tr key={`row-${i}`}>{children}</tr>);
  }
  return result;
};

export default BoardContent;
