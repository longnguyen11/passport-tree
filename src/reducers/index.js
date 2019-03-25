import { merge, omit, cloneDeep, set } from 'lodash';
import ActionTypes from '../constants/actionTypes';
import getRandomInt from '../util/randomInt';
const reducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case ActionTypes.ADD_BRANCH:
      newState = merge({}, state);
      newState.branches = newState.branches || [];
      newState.branches[action.id] = cloneDeep(omit(action, ['type']));
      return newState;

    case ActionTypes.CHANGE_BRANCH:
      newState = merge({}, state);
      merge(newState.branches[action.id], omit(action, ['type', 'id']));
      return newState;

    case ActionTypes.DELETE_BRANCH:
      newState = merge({}, state);
      delete newState.branches[action.id]
      return newState;

    case ActionTypes.GENERATE_LEAF:
      newState = merge({}, state);
      set(newState, `branches.${action.parentId}.leaf`,
        Array.from({length: action.amount}, () => getRandomInt(action.min, action.max)));
      return newState;
    default:
      return state
  }
}

export default reducer