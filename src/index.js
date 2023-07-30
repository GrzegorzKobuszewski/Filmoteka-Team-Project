import './sass/main.scss';
import './js/pagination.js';
import './js/modal.js';
import './js/footerModal.js';
import './js/api.js';
import { createMyMovieList, fetchTodayPopularMovies } from './js/api.js';
import './js/buttonGoTop.js';

//example of todayPopularMovies
// fetchTodayPopularMovies().then(response => {
//   response.results.forEach(movie => {
//     // console.log(movie);
//   });
// });

//own list creation
// createMyMovieList('Do obejrzenia', 'Lista filmów które chcę obejrzeć', 'pl')
//   .then(response => response.json())
//   // .then(response => console.log(response))
//   .catch(err => console.error(err));
