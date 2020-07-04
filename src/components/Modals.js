import React from 'react';

function Modals(props) {
  let _close = () => {
    if (typeof props.cbClose === 'function') {
      props.cbClose();
    }
  }

  let jsx = null;
  if (props.children) {
    jsx = (
      <>
        <div className="close" onClick={_close}>×</div>
        <div className="modal-bg">
          <div className="modal">{props.children}</div>
        </div>
      </>
    );
  }

  return (
    <div className="modals-container">
      {jsx}
    </div>
  )
}

export default Modals;
