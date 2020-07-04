import React from 'react'
import { connect } from 'react-redux'
import search from '../utils/search-utils'

function Results(props) {
  let meetings = props.appState.meetings

  let meetingsFiltered = search(meetings, props.appState.searchQuerry)

  let jsxArray = meetingsFiltered.map((item)=> {
    return (
      <div className="item">{item.firstname}</div>
    )
  })



  return (
    <div className="section-results">
      <h2>Results</h2>
      <div className="filter"></div>
      <div className="items">{jsxArray}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    appState: state
  }
}
export default connect(mapStateToProps)(Results)