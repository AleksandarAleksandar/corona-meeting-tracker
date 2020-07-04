import React from 'react';
import { connect } from 'react-redux'
import Btn from './Btn';


function App(props) {
  console.log(props)
  return (
    <div className="something">

      <div className="form-box">
        <form>
          <div className="form-field">
            <label>Label</label>
            <input type="text" value="something..." />
          </div>

          <div className="form-field">
            <label>Label</label>
            <input type="text" value="something..." />
          </div>

          <div className="form-field">
            <label>Label</label>
            <input type="text" value="something..." />
          </div>

          <Btn />
          <Btn title={'Submit'}/>
          <Btn title={'Submit'} inline />
          <Btn title={'Submit'} inline />
          <Btn />
          <Btn />

        </form>
      </div>

    </div>
  );
}

// export default App;
const mapStateToProps = (state) => {
  return { appState: state };
};
export default connect(mapStateToProps)(App);
