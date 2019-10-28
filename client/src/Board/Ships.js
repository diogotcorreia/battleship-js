import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Ship from './Ship';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
  },
});

const Ships = ({ gridSize }) => {
  const classes = useStyles();
  const commonProps = { gridSize };
  return (
    <div className={classes.root}>
      <Ship width={5} height={1} startX={0} startY={0} {...commonProps} />
      <Ship width={4} height={1} startX={0} startY={2} {...commonProps} />
      <Ship width={3} height={1} startX={0} startY={4} {...commonProps} />
      <Ship width={3} height={1} startX={4} startY={4} {...commonProps} />
      <Ship width={2} height={1} startX={0} startY={6} {...commonProps} />
    </div>
  );
};

export default Ships;
