import { combineReducers } from 'redux';
import branch from './branch';
import leaf from './leaf';
import error from './error';

export default combineReducers({
  branch,
  leaf,
  error
})