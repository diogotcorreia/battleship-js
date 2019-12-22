import { combineReducers } from 'redux';
import board from './board';
import main from './main';
import ships from './ships';

export default combineReducers({
  board,
  main,
  ships,
});
