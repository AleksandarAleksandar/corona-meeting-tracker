import React from 'react';
import Btn from './Btn';
import { connect } from 'react-redux';
import geoUtils from '../utils/geo-utils';
import actionTypes from '../actions/action-types'

class MeetingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      date: '',
      lat: '',
      long: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this._updatePosition = this._updatePosition.bind(this);
    this._submit = this._submit.bind(this);

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

  _submit() {
    this.props.dispatch({
      type: actionTypes.ADD_MEETING,
      payload: this.state
    })
  }

  render() {

    return (
      <div className="form-box">
        <form>
          <h2>Add meeting</h2>
          <p>What person have you meet, where and when</p>
          <div className="form-field">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleInputChange}
            />
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

            <Btn title={'Use my current location'} inline handleClick={() => { geoUtils.getMyLocation(this._updatePosition) }} />
          </div>

          <Btn title={'Cancel'} inline />
          <Btn title={'Submit'} inline handleClick={this._submit} />

        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { appState: state };
};
export default connect(mapStateToProps)(MeetingForm);
