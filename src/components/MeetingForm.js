import React from 'react';
import Btn from './Btn';
import { connect } from 'react-redux';
import geoUtils from '../utils/geo-utils';
import { actionMeetingAdd } from '../actions/actions';
import Spinner from './Spinner';
import Modals from './Modals';
import rootReducer from '../reducers';
import actionTypes from '../actions/action-types';


class MeetingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      date: '',
      lat: '',
      long: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this._updatePosition = this._updatePosition.bind(this);
    this._submit = this._submit.bind(this);
    this._validate = this._validate.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  _updatePosition(position) {
    if (position === false) {
      this.props.dispatch({
        type: 'USER_LOCATION_DETECTION_NOT_POSSIBLE'
      });
    } else {
      if (position.coords && typeof position.coords.latitude === 'number' && typeof position.coords.longitude === 'number') {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        this.setState({
          lat,
          long
        })
      }
    }

    if (position) {
      this.setState({ pos: position })
    }
  }

  _clearForm() {
    this.setState({
      firstname: '',
      lastname: '',
      date: '',
      lat: '',
      long: '',
      errors: {}
    });
  }

  _validate(submitData) {
    let valid = true;
    let s = submitData;
    let errors = {};
    if (s.firstname.trim() === '') {
      valid = false;
      errors.firstname = 'First name can not be empty';
    }
    if (s.lastname.trim() === '') {
      valid = false;
      errors.lastname = 'Last name can not be empty';
    }
    let date_invalid = false;
    let d = new Date(s.date);
    if (isNaN(d.getTime())) {
      date_invalid = true
      valid = false;
      errors.date = 'Date invalid format. Please use the followring format YYYY-MM-DD (ECMAScript Date string)';
    }
    this.setState({
      errors
    })
    return valid;
  }

  _submit() {
    let submitData = {
      firstname: this.state.firstname.trim(),
      lastname: this.state.lastname.trim(),
      date: this.state.date,
      lat: this.state.lat,
      long: this.state.long
    };
    if (this._validate(submitData)) {
      // if validating success, we submit
      this.props.dispatch(actionMeetingAdd(submitData));
      this._clearForm();
    }
  }

  render() {
    let jsxSpinner = null;
    if (this.props.meetingAddFetching) {
      jsxSpinner = <Spinner />
    }

    let _closeModal = () => {
      this.setState({
        modal: ''
      })
    }

    let _openModal = () => {
      this.setState({
        modal: 'CURENT_LOCATION'
      })
    };

    let _useMyCurrentLocation = () => {
      geoUtils.getMyLocation(this._updatePosition);
      _closeModal();
    };

    let jsxModalCurrentLocation = (
      <div className="modal-content">
        <p>We will get your current location from your browser if possiable. If browser asks "Know your location", please Allow</p>
        <Btn inline title={'Cancel'} handleClick={_closeModal} />
        <Btn inline title={'OK'} handleClick={_useMyCurrentLocation} />
      </div>
    )

    let jsxModal = null;
    if (this.state.modal === 'CURENT_LOCATION') {
      jsxModal = jsxModalCurrentLocation;
    }

    let Err = (props) => {
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

    return (
      <div className="form-box">
        <Modals cbClose={_closeModal}>
          {jsxModal}
        </Modals>
        <form>
          <h2>Add meeting</h2>
          <p>What person have you meet, where and when</p>
          {jsxSpinner}
          <div className="form-field">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
            />
            <Err err={this.state.errors.firstname} />
          </div>

          <div className="form-field">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleInputChange}
            />
            <Err err={this.state.errors.lastname} />
          </div>

          <div className="form-field">
            <label htmlFor="date">Date of Meeting (YYYY-MM-DD)</label>
            <input
              type="text"
              name="date"
              placeholder="YYYY-MM-DD"
              maxLength="10"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
            <Err err={this.state.errors.date} />
          </div>

          <div className="form-group">

            <h4>Place of meeting</h4>

            <div className="form-row">

              <div className="form-field">

                <label htmlFor="lat">Lat.</label>
                <input
                  type="number"
                  name="lat"
                  value={this.state.lat}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="long">long.</label>
                <input
                  type="number"
                  name="long"
                  value={this.state.long}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <Btn title={'Use my current location'} inline handleClick={_openModal} />
          </div>

          <Btn title={'Cancel'} inline handleClick={() => {
            this.props.dispatch({
              type: actionTypes.ROUTE,
              payload: 'HOME'
            })
          }} />
          <Btn title={'Submit'} inline handleClick={this._submit} />

        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    meetingAddFetching: state.meetingAddFetching
  };
};
export default connect(mapStateToProps)(MeetingForm);
