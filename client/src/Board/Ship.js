import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
}));

const Ship = ({ width, height, boardRef }) => {
  const classes = useStyles();
  console.log(boardRef.current);
  return (
    <Draggable
      offsetParent={boardRef.current}
      grid={[28, 28]}
      defaultPosition={{ x: 28, y: 0 }}
      positionOffset={{ x: 100, y: 100 }}
    >
      <div className={classes.root} style={{ width: width * 28, height: height * 28 }} />
    </Draggable>
  );
};

export default React.forwardRef((props, ref) => <Ship ref={ref} {...props} />);
