import axios from 'axios';

const API_KEY = '3e01ac77e72ef5279ae28f86eea7bc3c';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';


export function fetchWeather(city){
  const url = `${ROOT_URL}&q=${city}, us`;
  const request = axios.get(url);

  console.log('request:', request);

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
