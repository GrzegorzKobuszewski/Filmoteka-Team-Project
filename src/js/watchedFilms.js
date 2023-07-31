import Notiflix from 'notiflix';

let localStorageWatchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
if (localStorageWatchedFilms === null) {
  localStorage.setItem('watchedFilms', JSON.stringify([]));
}

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

const modalEl = document.querySelector('.modal');

modalEl.addEventListener('click', event => {
  if (event.target.classList.contains('watched-btn-modal')) {
    handleWatchedBtnClick(event);
  }
});

// Tablina obejrzanych filmów
export let watchedArray = JSON.parse(localStorage.getItem('watchedFilms'));
// console.log(watchedArray);
