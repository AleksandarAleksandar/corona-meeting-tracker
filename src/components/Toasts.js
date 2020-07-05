import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

function Toasts(props) {
  let jsx = null;
  if (props.toast !== '') {
    jsx = (
      <div className="toast">{props.toast}</div>
    )
  }
  return (
    <div className="toasts-container">
      {jsx}
    </div>
  )
}

Toasts.propTypes = {
  toast: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    toast: state.toast
  }
}
export default connect(mapStateToProps)(Toasts);
