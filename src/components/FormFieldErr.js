import React from 'react';
import PropTypes from 'prop-types';

const FormFieldErr = (props) => {
  let jsxErr = null;
  if (props.err) {
    jsxErr = (
      <div className="form-error"><span>*</span> {props.err}</div>
    );
  }
  return (
    <>
      {jsxErr}
    </>
  )
}

FormFieldErr.propTypes = {
  err: PropTypes.string
};

export default FormFieldErr;