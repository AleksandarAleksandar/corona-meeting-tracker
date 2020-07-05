import React from 'react'
import { connect } from 'react-redux'
import { search, filterByDate, groupBy } from '../utils/filter-utils'
import Spinner from './Spinner'
import { actionMeetingsNeeded } from '../actions/actions'
import MeetingsGroup from './MeetingsGroup'
import MeetingItem from './MeetingItem'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';


class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      makeGroups: true,
      groupByPerson: false,
      startDate: null,
      endDate: new Date(),
      showDatePicker: false
    })
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(range) {
    console.log(range); // native Date object
    this.setState({
      startDate: range.selection.startDate,
      endDate: range.selection.endDate
    });
  }

  componentDidMount() {
    // fetch data after mount
    this.props.dispatch(actionMeetingsNeeded());
  }

  render() {
    // DATA
    let props = this.props;

    let meetings = props.meetings;
    if (!Array.isArray(meetings)) {
      meetings = [];
    }

    // filtering by search query
    let meetingsFilteredByString = search(meetings, props.searchQuerry);
    // filtering by date range
    let meetingsFilteredByDateRange = filterByDate(meetings, this.state.startDate, this.state.endDate);
    // filtering finished
    let meetingsFiltered = meetingsFilteredByDateRange;

    // grouping
    let meetingGroupsObj = groupBy(meetingsFiltered, this.state.groupByPerson);



    // PRESENTATION

    let jsx = null;
    if (this.state.makeGroups) {
      // items rendered in groups
      let groupKeysArr = Object.keys(meetingGroupsObj); // extracting keys from object
      let jsxGroups = groupKeysArr.map((groupKey) => {
        let groupMeetings = meetingGroupsObj[groupKey]; // extract meetings from one group
        return (
          <MeetingsGroup key={groupKey} meetings={groupMeetings} />
        );
      });
      jsx = jsxGroups;

    } else {
      // simple items rendering without groups
      jsx = meetingsFiltered.map((item, index) => {
        return (
          <MeetingItem key={index} meeting={item} />
        );
      })

    }


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

    let clNoGroup = 'active';
    let clGroupPerson = '';
    let clGroupDate = '';
    if (this.state.makeGroups) {
      clNoGroup = '';
      clGroupPerson = '';
      clGroupDate = 'active'
      if (this.state.groupByPerson === true) {
        clNoGroup = '';
        clGroupPerson = 'active';
        clGroupDate = ''
      }
    }

    //
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: 'selection',
      dateDisplayFormat: 'yyyy-MM-dd'
    }

    let clDateRange = 'collapsible';
    if (this.state.showDatePicker) {
      clDateRange += ' show';
    }

    return (
      <div className="section-results">
        <h2>{jsxTitle}</h2>
        <div className="date-filter">
          <h4
            className="clickable"
            onClick={() => {
              if (this.state.showDatePicker) {
                this.setState({ showDatePicker: false })
              } else {
                this.setState({ showDatePicker: true })
              }
            }}
          >Choose date range</h4>
          <div className={clDateRange}>
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={this.handleSelect}
            />
          </div>
        </div>
        <div className="filter">
          <div className="title">Group by:</div>
          <div
            className={clNoGroup}
            onClick={() => {
              this.setState({
                makeGroups: false
              })
            }}
          >None</div>
          <div
            className={clGroupPerson}
            onClick={() => {
              this.setState({
                groupByPerson: true,
                makeGroups: true
              })
            }}
          >Person</div>
          <div
            className={clGroupDate}
            onClick={() => {
              this.setState({
                groupByPerson: false,
                makeGroups: true
              })
            }}
          >Date</div>
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