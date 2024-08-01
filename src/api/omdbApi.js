import axios from 'axios';

const API_KEY = 'aa4e93de';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const searchMovies = (query, page = 1, year = '', type = '') => {
  let url = `${BASE_URL}&s=${query}&page=${page}`;
  if (year) url += `&y=${year}`;
  if (type) url += `&type=${type}`;
  return axios.get(url);
};

export const getMovieDetails = (id) => 
  axios.get(`${BASE_URL}&i=${id}`);
