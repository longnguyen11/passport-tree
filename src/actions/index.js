import ActionTypes from '../constants/actionTypes';
export const showError = text => ({
  type: ActionTypes.SHOW_ERROR,
})

export const addBranch = filter => ({
  type: ActionTypes.ADD_BRANCH,
})
