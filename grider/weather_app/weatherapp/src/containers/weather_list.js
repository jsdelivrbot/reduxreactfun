import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
  renderWeather(cityData) {
    console.log(cityData)
    return(
      <tr>
        <td>{cityData.city.name}</td>
      </tr>
    );
  }

  render(){
    console.log("anything here?" , this.props);
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temp</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return {weather};
}

export default connect(mapStateToProps)(WeatherList);
