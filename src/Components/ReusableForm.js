import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          placeholder='Name' /><br />
        <input
          type='text'
          name='brand'
          placeholder='Brand' /><br />
        <input
          type='text'
          name='price'
          placeholder='Price' /><br />
        <input
          type='text'
          name='alcoholContent'
          placeholder='Alcohol Content' /><br />\
        <input
          type='text'
          name='count'
          placeholder='Total Left On Tap' /><br />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ReusableForm;