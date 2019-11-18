import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Ship from './Ship';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
  },
});

const Ships = () => {
  const classes = useStyles();
  const length = useSelector((state) => state.ships.size);
  return (
    <div className={classes.root}>
      {[...Array(length)].map((_, i) => (
        <Ship key={i} index={i} />
      ))}
    </div>
  );
};

export default Ships;
