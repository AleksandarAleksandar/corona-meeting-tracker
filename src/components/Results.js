import React from 'react'
import { connect } from 'react-redux'
import { search, makeGroups } from '../utils/search-utils'
import Spinner from './Spinner'
import { actionMeetingsNeeded } from '../actions/actions'


class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      groupByPerson: true
    })
  }

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

    let jsx = meetingsFiltered.map((item, index) => {
      return (
        <div key={index} className="item">{item.firstname} {item.lastname} {item.date} {item.lat} {item.long}</div>
      );
    })
    if (meetingsFiltered.length === 0) {
      jsx = (
        <p>List is empty</p>
      )
    }

    // NEW GROUPS
    console.log('BEFORE');
    console.log(meetingsFiltered);
    let meetingGroups = makeGroups(meetingsFiltered, this.state.groupByPerson);
    console.log('AFTER GROUPING');
    console.log(meetingGroups);
    //


    let jsxSpinner = null;
    if (props.meetingsFetching) {
      jsxSpinner = (<Spinner />);
      jsx = null;
    }

    let jsxTitle = 'Results'
    if (props.searchQuerry === '') {
      jsxTitle = 'All meetings'
    }

    let clGroupPerson = '';
    let clGroupDate = 'active'
    if (this.state.groupByPerson === true) {
      clGroupPerson = 'active';
      clGroupDate = ''
    }

    return (
      <div className="section-results">
        <h2>{jsxTitle}</h2>
        <div className="filter">
          <div
            className={clGroupPerson}
            onClick={() => {
              this.setState({
                groupByPerson: true
              })
            }}
          >Group By Person</div>
          <div
            className={clGroupDate}
            onClick={() => {
              this.setState({
                groupByPerson: false
              })
            }}
          >Group By Date</div>
        </div>
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