import React from 'react'
import { connect } from 'react-redux'
import search from '../utils/search-utils'
import Spinner from './Spinner'

function Results(props) {
  let meetings = props.meetings;
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

  let jsxTitle = 'Results'
  if (props.searchQuerry === '') {
    jsxTitle = 'All meetings'
  }



  return (
    <div className="section-results">
      <h2>{jsxTitle}</h2>
      <Spinner />
      <div className="filter"></div>
      <div className="items">{jsx}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    appState: state,
    meetings: state.meetings,
    searchQuerry: state.searchQuerry
  }
}
export default connect(mapStateToProps)(Results)