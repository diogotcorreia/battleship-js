import React from 'react';
import Grid from './Grid/Grid';

const Board = ({ size }) => {
  return (
    <div>
      <Grid size={size} />
    </div>
  );
};

export default Board;
