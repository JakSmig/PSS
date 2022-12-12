import { Weather } from '../lib/types';

const weatherSuccessResponse: Weather = {
  current: {
    condition: {
      text: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      code: 1000,
    },
    cloud: 0,
    feelslike_c: 26,
    feelslike_f: 79,
    gust_kph: 5.4,
    gust_mph: 3.4,
    humidity: 69,
    is_day: 1,
    last_updated: '2022-07-01 08:00',
    last_updated_epoch: 1656655200,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 29.85,
    pressure_mb: 1011,
    temp_c: 25.1,
    temp_f: 77,
    uv: 7,
    vis_km: 10,
    vis_miles: 6,
    wind_degree: 160,
    wind_dir: 'SSE',
    wind_kph: 6.8,
    wind_mph: 4.3,
  },
  location: {
    country: 'Poland',
    lat: 51.1,
    localtime: '2022-07-01 9:13',
    localtime_epoch: 1656659612,
    lon: 17.03,
    name: 'Warszawa',
    region: '',
    tz_id: 'Europe/Warsaw',
  },
};

export { weatherSuccessResponse };
