import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Ship from './Ship';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
  },
});

const Ships = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Ship size={5} startX={0} startY={0} />
      <Ship size={4} startX={0} startY={2} />
      <Ship size={3} startX={0} startY={4} />
      <Ship size={3} startX={4} startY={4} />
      <Ship size={2} startX={0} startY={6} />
    </div>
  );
};

export default Ships;
