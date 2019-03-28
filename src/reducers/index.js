import { merge, omit, cloneDeep, set } from 'lodash';
import ActionTypes from '../constants/actionTypes';
const reducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case ActionTypes.ADD_BRANCH:
      newState = merge({}, state);
      newState.branches = newState.branches || [];
      newState.branches[action.id] = cloneDeep(omit(action, ['type']));
      newState.rootErrors = {};
      return newState;

    case ActionTypes.CHANGE_BRANCH:
      newState = merge({}, state);
      merge(newState.branches[action.id], omit(action, ['type', 'id']));
      return newState;

    case ActionTypes.MERGE_DATA:
      return  merge({}, state, action.transform);

    case ActionTypes.DELETE_BRANCH:
      newState = merge({}, state);
      delete newState.branches[action.id]
      return newState;

    case ActionTypes.SHOW_ROOT_ERROR:
      newState = merge({}, state);
      newState.rootErrors = action.errors
      return newState;

    case ActionTypes.SHOW_BRANCH_ERROR:
      newState = merge({}, state);
      newState.branches[action.id].branchErrors = action.errors
      return newState;

    case ActionTypes.GENERATE_LEAF:
      newState = merge({}, state);
      set(newState, `branches.${action.id}.leaf`, action.data);
      set(newState, `branches.${action.id}.branchErrors`, {});
      return newState;
    default:
      return state
  }
}

export default reducer