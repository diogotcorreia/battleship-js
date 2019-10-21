import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles({
  square: {
    width: 28,
    height: 28,
  },
  grey: {
    backgroundColor: '#ddd',
  },
});

const BoardContent = ({ size }) => {
  const classes = useStyles();
  return (
    <table>
      <tbody>{generateBoard(size, classes)}</tbody>
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
