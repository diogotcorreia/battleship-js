import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Ship from './Ship';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const Ships = ({ boardRef }) => {
  const classes = useStyles();
  const commonProps = { boardRef };
  return (
    <div className={classes.root}>
      <Ship width={4} height={1} {...commonProps} />
    </div>
  );
};

export default Ships;
