import { fetchMoviesByQuery } from './api';
import { state } from './state';
import Notiflix from 'notiflix';

const searchFormEl = document.querySelector('.header__form');
console.log(searchFormEl);
const inputEl = document.querySelector('.header__form__input');
console.log(inputEl);
//const moviesEl = document.querySelector('tutaj_klasa_galerii')

//przeniosłem kod wyszukiwania do pliku pagination.js

// searchFormEl.addEventListener('submit', e => {
//   e.preventDefault();
//   if (!inputEl.value.trim())
//     return Notiflix.Notify.failure('P2lease enter a search query for the movie');

//   console.log(`user triggered search movie with value {${inputEl.value.trim()}}`);
//   state.whatPaginated = 'search';
//   // tutaj wypadaloby resetowac paginacje ktora byla np. z poprzedniego wyszukiwania
//   state.query = inputEl.value.trim();
//   //moviesEl.innerHTML = ''; <- uncomm, jak bedzie galeria i bedzie gdzie wyswietlic wynik searcha
//   fetchMoviesByQuery(state.query, state.currentPage)
//     .then(res => {
//       const { results, total_pages } = res;
//       state.totalPages = total_pages;

//       if (state.totalPages > 1) {
//         //tutaj paginacja... -> renderowanie kodu do paginacji( numerki stron itp)

//         Notiflix.Notify.success('Hooray! We found something interesting for you!');
//       } else {
//         Notiflix.Notify.failure("We couldn't find anything related to Your search");
//       }

//       inputEl.value = '';

//       //return wyrenderujGalerie(results); tutaj wypadaloby dodac funkcje renderowania galerii ktora bedzie przyjmowac results
//     })
//     .then(res => {
//       //moviesEl.insertAdjacentHTML('beforeend', res);
//     });
// });
