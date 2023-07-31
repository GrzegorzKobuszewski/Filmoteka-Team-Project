import Notiflix from 'notiflix';

let localStorageWatchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
if (localStorageWatchedFilms === null) {
  localStorage.setItem('watchedFilms', JSON.stringify([]));
}

//słuchanie czy kliknie w WatchedBtn:
function handleWatchedBtnClick(event) {
  const watchedBtn = event.target.closest('.watched-btn-modal');
  let movieId = watchedBtn.getAttribute('data-id');
  if (!localStorageWatchedFilms.includes(movieId)) {
    localStorageWatchedFilms.push(movieId);
    localStorage.setItem('watchedFilms', JSON.stringify(localStorageWatchedFilms));
  } else {
    Notiflix.Notify.failure(`Ten film został już dodany!`);
  }
}

const modalEl = document.querySelector('.modal');

// Dodajemy słuchacza zdarzeń dla całego modala
modalEl.addEventListener('click', event => {
  // Sprawdzamy, czy kliknięcie było na przycisku watched
  if (event.target.classList.contains('watched-btn-modal')) {
    // Wywołujemy funkcję tylko wtedy, gdy kliknięto przycisk
    handleWatchedBtnClick(event);
  }
});

let filmsArr = JSON.parse(localStorage.getItem('watchedFilms'));
console.log(filmsArr);
