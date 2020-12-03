import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://findway-tcc-2.herokuapp.com',
});
