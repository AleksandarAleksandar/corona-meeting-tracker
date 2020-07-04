const initialState = {
  route: 'HOME',
  searchQuerry: '',
  people: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOMETHING':
      return {
        ...state
      }

    default:
      return state
  }
};

export default rootReducer;