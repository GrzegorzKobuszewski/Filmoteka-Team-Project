import Notiflix from 'notiflix';
import { typeOfAPI } from './pagination';
import { watchedArray } from './watchedFilms';
import { getStartMovies } from './pagination';

// debugger;
//typeOfAPI = 'library';
//Notiflix.Notify.success('lib');

//teraz, gdy istnieje już DOM  library, implementuję słuchanie:
const headerLibrary = document.querySelector('.header--library__buttons');
console.log(headerLibrary);

headerLibrary.addEventListener('click', event => {
  if (event.target.classList.contains('watched-btn-modal--color')) {
    showWatched();
  }
  if (event.target.classList.contains('queue-btn-modal--color')) {
    showQueue();
  }
});

function showWatched() {
  Notiflix.Notify.success('już pokazuję Watches');
}

function showQueue() {
  Notiflix.Notify.success('już pokazuję Queue');
}

//polecenia wykonywane po wczytaniu strony:
