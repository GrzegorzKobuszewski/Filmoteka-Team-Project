import Notiflix from 'notiflix';
import { fetchMovieById } from './api.js';

//słuchanie czy kliknie w WatchedBtn:
async function handleWatchedBtnClick(event) {
  const watchedBtn = event.target.closest('.watched-btn-modal');
  let movieId = await watchedBtn.getAttribute('data-id');
  if (!localStorageWatchedFilms.includes(movieId)) {
    localStorageWatchedFilms.push(movieId);
    localStorage.setItem('watchedFilms', JSON.stringify(localStorageWatchedFilms));
  } else {
    Notiflix.Notify.failure(`Ten film został już dodany!`);
  }
}

let localStorageWatchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
if (localStorageWatchedFilms === null) {
  localStorage.setItem('watchedFilms', JSON.stringify([]));
}
const modalEl = document.querySelector('.modal');

modalEl.addEventListener('click', event => {
  if (event.target.classList.contains('watched-btn-modal')) {
    handleWatchedBtnClick(event);
  }
});

// Tablina obejrzanych filmów
export let watchedArray = JSON.parse(localStorage.getItem('watchedFilms'));

async function renderFilmDetails(arr) {
  for (let i = 0; i < arr.length; i++) {
    const oneId = arr[i];

    const filmDetails = await fetchMovieById(oneId);

    let titleWatched = filmDetails.title;
    let genreWatched = filmDetails.genres;
    let voteWatched = filmDetails.vote_count;
    let posterWatched = 'https://image.tmdb.org/t/p/w300' + filmDetails.poster_path;
    // console.log(titleWatched);
    // genreWatched.forEach(element => {
    //   console.log(element.name);
    // });
    // console.log(posterWatched);
    // console.log(voteWatched);
  }
}
// renderFilmDetails(watchedArray);
export { renderFilmDetails };
