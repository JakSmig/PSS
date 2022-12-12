import axios from 'axios';

import { Capital, Image } from '../lib/types';
type Ratings = {
  rating_attraction_avg: number;
  rating_food_avg: number;
  rating_general_avg: number;
  rating_transport_avg: number;
};

export const getCapitalInfo = (name: string) => {
  return axios
    .get<Capital>(`http://localhost:8080/capital/name?name=${name}`)
    .then(res => res.data);
};

export const getCapitalInfoByCountry = (country: string) => {
  return axios
    .get<Capital>(`http://localhost:8080/capital/country?country=${country}`)
    .then(res => res.data);
};

export const getCapitalsInBounds = () => {
  return axios
    .get<Capital[]>('http://localhost:8080/capital/all')
    .then(res => res.data);
};
export const getCapitalPhotos = (name: string) => {
  return axios
    .get<Image[]>(`http://localhost:8080/capital/photos?capitalName=${name}`)
    .then(res => res.data);
};
export const getCapitalAverage = (name: string) => {
  return axios
    .get<Ratings>(`http://localhost:8080/capital/average?name=${name}`)
    .then(res => res.data);
};
