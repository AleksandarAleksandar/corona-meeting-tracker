import actionTypes from '../actions/action-types';
import ajaxSimulator from '../utils/ajax-simulator-utils'

let actionShowModel = (title) => {
  // console.log('t 1')
  // THUNK
  return (dispatch) => {
    // console.log('t 2')
    dispatch({
      type: actionTypes.SHOW_TOAST,
      payload: title
    });
    setTimeout(() => {
      // remove toast after 2 seconds
      dispatch({ type: actionTypes.REMOVE_TOAST });
    }, 2000);

  }
}


let actionSubmitSearch = (q) => {
  //THUNk
  return (dispatch) => {
    // STEP 1
    dispatch({
      type: actionTypes.SUBMIT_SEARCH,
      payload: q
    })
    // STEP 2
    dispatch({
      type: actionTypes.ROUTE,
      payload: 'HOME'
    })
  }
}


let actionMeetingsNeeded = () => {
  // THUNK
  return (dispatch) => {
    // STEP 1 immediately
    dispatch({
      type: actionTypes.MEETINGS_FETCHING
    })
    // STEP 2 ajax request
    ajaxSimulator.getMeetings()
      .then((response) => {
        // STEP 3 wil be called on success ajax response
        dispatch({
          type: actionTypes.MEETINGS_FETCHED,
          payload: response
        });
        console.log(response);
      })

  }
}

let actionMeetingAdd = (meeting) => {
  //THUNK
  return (dispatch) => {
    // STEP 1 immediately
    dispatch({
      type: actionTypes.MEETING_ADD_FETCHING
    })
    // STEP 2 ajax request
    ajaxSimulator.postMeeting(meeting)
      .then((response) => {
        // STEP 3 wil be called on success ajax response
        dispatch({
          type: actionTypes.MEETING_ADD_FETCHED
        })
        dispatch(actionShowModel('Success!'));
      })
  }

}


export { actionShowModel, actionMeetingAdd, actionMeetingsNeeded, actionSubmitSearch }
