import axios from 'axios';
const overpassClient = axios.create({
  baseURL: process.env.REACT_APP_OVERPASS_API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

export { overpassClient };
