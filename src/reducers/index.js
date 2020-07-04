import actionTypes from '../actions/action-types'
import idUtils from '../utils/id-utils'
import { act } from 'react-dom/test-utils';

const initialState = {
  route: 'HOME',
  searchQuerry: '',
  meetings: [],
  toast: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: action.payload
      }

    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toast: ''
      }

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

    case actionTypes.SUBMIT_SEARCH:
      return {
        ...state,
        searchQuerry: action.payload
      }

    default:
      return state
  }
};

export default rootReducer;