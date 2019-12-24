import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Grid from './Grid/Grid';
import Ships from './Ships';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    position: 'relative',
    display: 'flex',
  },
}));

const Board = () => {
  const classes = useStyles();
  const pregame = useSelector((store) => store.main.get('gameState', 'PREGAME') === 'PREGAME');

  return (
    <div className={classes.root} id='board'>
      <Grid boardName='own' title={!pregame && 'Your board'} />
      {pregame ? <Ships /> : <Grid boardName='opponent' title="Opponent's board" clickable />}
    </div>
  );
};

export default Board;
