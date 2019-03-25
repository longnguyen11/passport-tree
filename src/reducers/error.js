import { merge } from 'lodash';
import ActionTypes from '../constants/actionTypes';
const error = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ERROR:
      return merge({}, state, {error: 'weeeeee'});
    default:
      return state
  }
}

export default error