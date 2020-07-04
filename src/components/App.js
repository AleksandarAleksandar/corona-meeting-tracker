import React from 'react';
import { connect } from 'react-redux'
import Btn from './Btn';
import MeetingForm from './MeetingForm'
import SearchForm from './SearchForm'
import Results from './Results'


function App(props) {
  console.log(props)

  let _click = () => {
    // e.preventDefault();
    console.log('click');
    props.dispatch({ type: 'SOME_CLICK' })
  }
  return (
    <div className="something">

      <SearchForm />

      <Results />

      <MeetingForm />

    </div>
  );
}

// export default App;
const mapStateToProps = (state) => {
  return { appState: state };
};
export default connect(mapStateToProps)(App);
