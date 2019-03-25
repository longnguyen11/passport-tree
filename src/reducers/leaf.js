const leaf = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LEAF':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default leaf