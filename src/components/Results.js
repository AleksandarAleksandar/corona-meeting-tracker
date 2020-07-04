import React from 'react'
import { connect } from 'react-redux'
import search from '../utils/search-utils'
import Spinner from './Spinner'
import { actionMeetingsNeeded } from '../actions/actions'


class Results extends React.Component {

  componentDidMount() {
    // fetch data after mount
    this.props.dispatch(actionMeetingsNeeded());
  }

  render() {
    let props = this.props;

    let meetings = props.meetings;
    if (!Array.isArray(meetings)) {
      meetings = [];
    }
    let meetingsFiltered = search(meetings, props.searchQuerry);

    let jsx = meetingsFiltered.map((item) => {
      return (
        <div key={item.id} className="item">{item.firstname}</div>
      );
    })
    if (meetingsFiltered.length === 0) {
      jsx = (
        <p>List is empty</p>
      )
    }

    let jsxSpinner = null;
    if (props.meetingsFetching) {
      jsxSpinner = (<Spinner />);
      jsx = null;
    }

    let jsxTitle = 'Results'
    if (props.searchQuerry === '') {
      jsxTitle = 'All meetings'
    }

    return (
      <div className="section-results">
        <h2>{jsxTitle}</h2>
        <div className="filter"></div>
        {jsxSpinner}
        <div className="items">
          {jsx}
        </div>
      </div>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    meetings: state.meetings,
    meetingsFetching: state.meetingsFetching,
    searchQuerry: state.searchQuerry
  }
}
export default connect(mapStateToProps)(Results)