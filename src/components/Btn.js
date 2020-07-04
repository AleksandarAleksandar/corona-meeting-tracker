import React from 'react'

const Btn = (props) => {
  let cl = 'btn'
  if (props.inline === true) {
    cl+= ' btn-inline'
  }
  return (
    <div className={cl}>{props.title}</div>
  )
}

export default Btn;
