import React from 'react';
import JoinRoom from './Pregame/JoinRoom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
    textAlign: 'center',
  },
}));

const Menu = () => {
  const classes = useStyles();
  const pregame = useSelector((state) => state.main.get('pregame', true));
  if (pregame)
    return (
      <div className={classes.root}>
        <JoinRoom />
      </div>
    );
  else return <div className={classes.root}></div>;
};

export default Menu;
