import axios from 'axios';

const overpassClient = axios.create({
  baseURL: process.env.REACT_APP_OVERPASS_API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});
const currencyClient = axios.create({
  baseURL: process.env.REACT_APP_CURRENCY_API_URL,
  headers: {
    apikey: process.env.REACT_APP_CURRENCY_API_KEY,
  },
});

const weatherClient = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
  },
});

export { overpassClient, currencyClient, weatherClient };
