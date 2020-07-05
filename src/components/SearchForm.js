import React from 'react';
import PropTypes from 'prop-types';
import { actionSubmitSearch } from '../actions/actions';

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this._handleSearchChange = this._handleSearchChange.bind(this);
    this._submitSearch = this._submitSearch.bind(this);

  }

  _handleSearchChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let old_value = this.state.search;

    this.setState({
      [name]: value
    });

    let trimmed_new_value = value.trim();
    if (trimmed_new_value !== old_value.trim()) {
      this._submitSearch(trimmed_new_value);
      console.log('new search');
    }
  }

  _submitSearch(q) {
    this.props.dispatch(actionSubmitSearch(q));
  }

  render() {
    return (
      <div className="search-form-box">
        <input
          type="text"
          name="search"
          placeholder="Search first and last name"
          value={this.state.search}
          onChange={this._handleSearchChange}
        />
      </div>
    )
  }
}

SearchForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default SearchForm;
