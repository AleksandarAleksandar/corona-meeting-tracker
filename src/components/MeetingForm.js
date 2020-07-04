import React from 'react'
import Btn from './Btn'
import { connect } from 'react-redux'

class MeetingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    let _submit = () => {
      // e.preventDefault();
      console.log('click');
      this.props.dispatch({ type: 'SOME_CLICK' })
    }
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

                <label>Lat.</label>
                <input
                  type="text"
                  placeholder="123"
                />
              </div>
              <div className="form-field">
                <label>long.</label>
                <input
                  type="text"
                  placeholder="123"
                />
              </div>
            </div>

            <Btn title={'Use my current location'} inline handleClick={() => {}} />
          </div>

          <Btn title={'Cancel'} inline />
          <Btn title={'Submit'} inline handleClick={_submit} />

        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { appState: state };
};
export default connect(mapStateToProps)(MeetingForm);
