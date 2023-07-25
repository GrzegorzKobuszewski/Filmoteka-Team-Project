export let page;
export let query;

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd832ba66be946901d48e3ec088007096';
const AUTHORIZATION_POST =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMyYmE2NmJlOTQ2OTAxZDQ4ZTNlYzA4ODAwNzA5NiIsInN1YiI6IjY0YmViZjk1ODVjMGEyMDBjODk5MDIwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ibmvsUJMSQZD2lskIdqLPXqS0--iP8mlOeSyowb1a2I';

async function fetchPopularMovies(page) {
  const url = new URL(`${BASE_URL}/trending/movie/week`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('page', page);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
async function fetchTodayPopularMovies() {
  const url = new URL(`${BASE_URL}/trending/movie/day`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchMoviesByQuery(query, page) {
  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('query', query);
  url.searchParams.append('page', page);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchMovieById(id) {
  const url = new URL(`${BASE_URL}/movie/${id}`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchTrailerById(id) {
  const url = new URL(`${BASE_URL}/movie/${id}/videos`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchGenres() {
  const url = new URL(`${BASE_URL}/genre/movie/list`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data.genres;
}

async function createMyMovieList(listName, listDescription, language) {
  const url = new URL(`${BASE_URL}/list`);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AUTHORIZATION_POST}`,
    },
    body: JSON.stringify({
      name: listName,
      description: listDescription,
      language: language,
    }),
  };

  const response = await fetch(url, options);
  return response;
}

export {
  fetchPopularMovies,
  fetchTodayPopularMovies,
  fetchMoviesByQuery,
  fetchMovieById,
  fetchTrailerById,
  fetchGenres,
  createMyMovieList,
  BASE_URL,
  API_KEY,
};
