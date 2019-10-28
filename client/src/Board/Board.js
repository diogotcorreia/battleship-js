import React from 'react';
import Grid from './Grid/Grid';
import Ships from './Ships';
import Test from './Test';

const Board = ({ size }) => {
  const boardRef = React.createRef();
  const Test2 = React.forwardRef((props, ref) => <Test boardRef={ref} {...props} />);
  return (
    <div>
      <Grid size={size} boardRef={boardRef} />
      <Ships boardRef={boardRef} />
      <Test2 ref={boardRef} />
    </div>
  );
};

export default Board;
