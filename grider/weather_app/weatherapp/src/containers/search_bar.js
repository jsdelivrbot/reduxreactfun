import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props){
    super();

    this.state = {
      term: ''
    }

    //constructor bind
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event){
    this.setState({term: event.target.value}); //after state.term changes then onFormSubmit gets called
  }

  onFormSubmit(event){
    event.preventDefault();

    //get weather data
    this.props.fetchWeather(this.state.term); //this takes the value of term that was set in the function above.

    this.setState({ term: ''}); //this clears the search box
  }

  render(){
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Get a five-day forecast in your favorite city"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
            />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchWeather: fetchWeather
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
