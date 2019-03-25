import { merge } from 'lodash';
import ActionTypes from '../constants/actionTypes';
const branch = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BRANCH:
      return merge({}, state, {branch: 'raaaa'});
    default:
      return state
  }
}

export default branch