import { combineReducers } from 'redux';
import main from './main';
import ships from './ships';

export default combineReducers({
  main,
  ships,
});
