import actionTypes from '../actions/action-types'
import idUtils from '../utils/id-utils'

const initialState = {
  route: 'HOME',
  searchQuerry: '',
  meetings: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MEETING:
      let new_meeting = {
        ...action.payload,
        id: idUtils.getNewId()
      }
      let meetings = [...state.meetings, new_meeting]
      return {
        ...state,
        meetings
      }

    default:
      return state
  }
};

export default rootReducer;