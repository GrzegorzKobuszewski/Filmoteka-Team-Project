import './sass/main.scss';
import './js/pagination';
import './js/modal.js';
import './js/footerModal.js';
import './js/api';
import { createMyMovieList, fetchTodayPopularMovies } from './js/api';

//example of todayPopularMovies
fetchTodayPopularMovies().then(response => {
  response.results.forEach(movie => {
    // console.log(movie);
  });
});

//own list creation
createMyMovieList('Do obejrzenia', 'Lista filmów które chcę obejrzeć', 'pl')
  .then(response => response.json())
  // .then(response => console.log(response))
  .catch(err => console.error(err));
