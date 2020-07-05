import React from 'react';
import { connect } from 'react-redux'
import Btn from './Btn';
import MeetingForm from './MeetingForm'
import SearchForm from './SearchForm'
import Results from './Results'
import Toasts from './Toasts'
import Modals from './Modals'
import storageUtils from '../utils/storage-utils'
import actionTypes from '../actions/action-types';


function App(props) {

  let _devClearStorage = () => {
    console.log('** clearing storage');
    storageUtils.clear();
  }

  let _routeAdd = () => {
    props.dispatch({
      type: actionTypes.ROUTE,
      payload: 'ADD'
    })
  }

  let jsxRoute = null;
  if (props.route === 'ADD') {
    jsxRoute = (<MeetingForm />)
  } else {
    jsxRoute = (<Results />)
  }

  return (
    <div className="app">
      <Toasts />
      
      <div className="header"><h1>Corona Tracker App</h1></div>
      <div className="main">
        <div className="wrapper">
          <Btn title={'Track new person'} handleClick={_routeAdd} />

          <SearchForm dispatch={props.dispatch}/>

          {jsxRoute}

          <h2>Dev options</h2>
          <Btn title={'Clear storage'} handleClick={_devClearStorage} />
        </div>
      </div>
      <div className="footer">Copyright</div>
    </div>
  );
}

// export default App;
const mapStateToProps = (state) => {
  return {
    route: state.route
  };
};
export default connect(mapStateToProps)(App);
