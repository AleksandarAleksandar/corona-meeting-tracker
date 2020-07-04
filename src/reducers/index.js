import actionTypes from '../actions/action-types'

const initialState = {
  route: 'HOME',
  searchQuerry: '',
  meetings: [],
  meetingsFetching: false,
  meetingAddFetching: false,
  toast: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ROUTE:
      return {
        ...state,
        route: action.payload
      }

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

    case actionTypes.MEETINGS_FETCHING:
      return {
        ...state,
        meetingsFetching: true
      }

    case actionTypes.MEETINGS_FETCHED:
      return {
        ...state,
        meetingsFetching: false,
        meetings: action.payload
      }

    case actionTypes.MEETING_ADD_FETCHING:
      return {
        ...state,
        meetingAddFetching: true
      }

    case actionTypes.MEETING_ADD_FETCHED:
      return {
        ...state,
        meetingAddFetching: false
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