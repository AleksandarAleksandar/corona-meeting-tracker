import React from 'react'
import { connect } from 'react-redux'
import { search, makeGroups, groupBy } from '../utils/search-utils'
import Spinner from './Spinner'
import { actionMeetingsNeeded } from '../actions/actions'


class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      makeGroups: true,
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

    // NEW GROUPS
    console.log('BEFORE');
    console.log(meetingsFiltered);
    let meetingGroupsObj = groupBy(meetingsFiltered, this.state.groupByPerson);
    console.log('AFTER GROUPING');
    console.log(meetingGroupsObj);
    //


    // 3 nacina prikaza -------------------------
    let Group = (props) => {
      let jsx_arr = props.meetings.map(() => {
        return (<div className="item">ITEM</div>);
      });
      return (
        <>
          {jsx_arr}
        </>
      );
    };


    let jsx = null;
    if (this.state.makeGroups) {
      // items rendered in groups
      let groupKeysArr = Object.keys(meetingGroupsObj); // extracting keys from object
      let jsxGroups = groupKeysArr.map((group_key) => {
        let groupMeetings = meetingGroupsObj[group_key]; // extract meetings from one group
        return (
          <div key={group_key} className="items-group">
            <Group meetings={groupMeetings} />
          </div>
        );
      });
      jsx = jsxGroups;

    } else {
      // normal items, without groups
      jsx = meetingsFiltered.map((item, index) => {
        return (
          <div key={index} className="item">{item.firstname} {item.lastname} {item.date} {item.lat} {item.long}</div>
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

    return (
      <div className="section-results">
        <h2>{jsxTitle}</h2>
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