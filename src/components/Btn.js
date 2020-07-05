import React from 'react'
import PropTypes from 'prop-types';

const Btn = (props) => {
  let cl = 'btn'
  if (props.inline === true) {
    cl+= ' btn-inline'
  }
  return (
    <div className={cl} onClick={props.handleClick}>{props.title}</div>
  )
}

Btn.propTypes = {
  inline: PropTypes.bool,
  title: PropTypes.string,
  handleClick: PropTypes.func
};

export default Btn;
