import axios from 'axios';

import { Avatar } from '../lib/types';

export const getAllAvatars = () => {
  return axios
    .get<Avatar[]>('http://localhost:8080/avatar/all')
    .then(res => res.data);
};
