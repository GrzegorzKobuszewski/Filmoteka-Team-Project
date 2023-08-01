//dodanie potrzebnych bibliotek:

import Notiflix from 'notiflix';
import { fetchMovieById } from './api.js';
import { getStartMovies } from './pagination.js';

Notiflix.Notify.failure(`test!!!`);

//Definicja funkcji: słuchanie czy kliknie w WatchedBtn
// tą definicję musiałem przenieść na moment, w którym modal istnieje!
// Funkcja dodana tuaj generuje błąd:
//Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
//at 89OjK.notiflix (watchedFilms.js:14:9)

// const modalEl = document.querySelector('.modalButton');
// console.log(modalEl);

// modalEl.addEventListener('click', event => {
//   if (event.target.classList.contains('watched-btn-modal')) {
//     handleWatchedBtnClick(event);
//   }
// });

// function handleWatchedBtnClick(event) {
//   const watchedBtn = event.target.closest('.watched-btn-modal');
//   let movieId = watchedBtn.getAttribute('data-id');
//   if (!localStorageWatchedFilms.includes(movieId)) {
//     localStorageWatchedFilms.push(movieId);
//     localStorage.setItem('watchedFilms', JSON.stringify(localStorageWatchedFilms));
//     Notiflix.Notify.success(`Film dodano!`);
//   } else {
//     Notiflix.Notify.failure(`Ten film został już dodany!`);
//   }
// }

// dane

export let localStorageWatchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
if (localStorageWatchedFilms === null) {
  localStorage.setItem('watchedFilms', JSON.stringify([]));
}

// Tablica obejrzanych filmów
const watchedIdArray = JSON.parse(localStorage.getItem('watchedFilms'));
const watchedVideosArray = []; //do tej tablicy bedę wczytywać filmy ze szczegółami

for (let i = 1; i <= watchedIdArray.length; i++) {
  watchedVideosArray.push(i);
}
let filmDetails;
async function renderFilmDetails(arr) {
  // iteruj po tablicy ID ków

  for (let i = 0; i < arr.length; i++) {
    filmDetails = await fetchMovieById(arr[i]);
    //wczytane szczegóły filmu wczytaj do tablicy
    // debugger;
    //poprawka dla przypadku, w którym nie istnieje path dla cover'a

    if (filmDetails.poster_path === null) {
      const newPosterPath = new URL('../images/nocover.jpg', import.meta.url);
      filmDetails.poster_path = newPosterPath;
    } else {
      filmDetails.poster_path = `https://image.tmdb.org/t/p/w300/${filmDetails.poster_path}`;
    }

    //poprawka na genres === null
    if (filmDetails.genres.length === 0) {
      filmDetails.genres.push({ name: 'noname' });
    }

    // debugger;
    watchedVideosArray[i] = {
      year: filmDetails.release_date,
      id: filmDetails.id,
      poster: filmDetails.poster_path,
      title: filmDetails.title,
      genre: filmDetails.genres[0].name,
      vote: filmDetails.vote_average.toFixed(2),
    };
  }
  // debugger;
  localStorage.setItem('typeOfAPI', 'watched');
  // debugger;
  getStartMovies();
}

console.log(watchedVideosArray);
console.log(renderFilmDetails(watchedIdArray));
export { watchedVideosArray };
