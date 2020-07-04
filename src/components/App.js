import React from 'react';
import { connect } from 'react-redux'
import Btn from './Btn';
import MeetingForm from './MeetingForm'
import SearchForm from './SearchForm'
import Results from './Results'
import Toasts from './Toasts'


function App(props) {
  console.log(props)

  let _click = () => {
    // e.preventDefault();
    console.log('click');
    props.dispatch({ type: 'SOME_CLICK' })
  }
  return (
    <div className="app">
      <Toasts />
      <div className="header"><h1>Corona Tracker App</h1></div>
      <div className="main">
        <SearchForm />

        <Results />

        <MeetingForm />

      </div>
      <div className="footer">Copyright</div>
    </div>
  );
}

// export default App;
const mapStateToProps = (state) => {
  return { appState: state };
};
export default connect(mapStateToProps)(App);
