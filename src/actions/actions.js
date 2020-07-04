import actionTypes from '../actions/action-types';

let actionShowModel = (title) => {
  console.log('t 1')
  // THUNK
  return (dispatch) => {
    console.log('t 2')
    dispatch({
      type: actionTypes.SHOW_TOAST,
      payload: title
    });
    let t = setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch({ type: actionTypes.REMOVE_TOAST });
    }, 2000);

  }
}

export { actionShowModel }
