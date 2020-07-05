import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Btn from './Btn';
import MeetingForm from './MeetingForm'
import SearchForm from './SearchForm'
import Results from './Results'
import Toasts from './Toasts'
import storageUtils from '../utils/storage-utils'
import actionTypes from '../actions/action-types';

function App(props) {

  let _devClearStorage = () => {
    storageUtils.clear();
  }

  let _routeAdd = () => {
    props.dispatch({
      type: actionTypes.ROUTE,
      payload: 'ADD'
    })
  }

  let jsxRoute = null;
  let jsxBtn = null;
  if (props.route === 'ADD') {
    jsxRoute = (<MeetingForm />)
  } else {
    jsxRoute = (<Results />);
    jsxBtn = (
      <>
        <br />
        <Btn inline title={'Track new person'} handleClick={_routeAdd} />
      </>
    );
  }

  return (
    <div className="app">
      <Toasts />
      <div className="header"><h1>Corona Tracker App</h1></div>
      <div className="main">
        <div className="wrapper">

          <SearchForm dispatch={props.dispatch} />

          {jsxRoute}
          {jsxBtn}

          <h2>Dev options</h2>
          <Btn inline title={'Clear storage'} handleClick={_devClearStorage} />
        </div>
      </div>
      <div className="footer">Copyright © Aleksandar Vasiljevic 2020</div>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func,
  route: PropTypes.string
};

// export default App;
const mapStateToProps = (state) => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(App);
