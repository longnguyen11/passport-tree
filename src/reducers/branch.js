import { merge } from 'lodash';
import ActionTypes from '../constants/actionTypes';
import initialState from '../constants/initialState';
const branch = (state = initialState, action) => {

  let newState;
  switch (action.type) {
    case ActionTypes.ADD_BRANCH:
      newState = merge({}, state);
      const {type, ...omitType} = action;
      newState.branch.push(omitType);
      return newState;
    default:
      return state
  }
}

export default branch