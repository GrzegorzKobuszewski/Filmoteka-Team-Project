const movieCards = document.querySelectorAll('.movie-card');
const modal = document.querySelector('.backdrop');
const closeBtn = document.querySelector('#close-btn');
import { html } from './pagination.js';
import { localStorageWatchedFilms } from './watchedFilms.js';
import { localStorageInQueue } from './filmsInQueue.js';
import Notiflix from 'notiflix';

export function openModal() {
  //podstawiam zmienną html pod zawartość znacznika <div id='detalisMovie'>
  const detailsElement = document.getElementById('detailsMovie');
  if (detailsElement) {
    detailsElement.innerHTML = html;
  }

  modal.style.display = 'flex';

  //teraz, gdy istnieje już modal, implementuję słuchanie przycisku
  const modalEl = document.querySelector('.modalButton');
  // console.log(modalEl);

  modalEl.addEventListener('click', event => {
    if (event.target.classList.contains('watched-btn-modal')) {
      handleWatchedBtnClick(event);
    }
    if (event.target.classList.contains('queue-btn-modal')) {
      handleQueueBtnClick(event);
    }
  });
}

function handleWatchedBtnClick(event) {
  const watchedBtn = event.target.closest('.watched-btn-modal');
  // debugger;
  let movieId = watchedBtn.getAttribute('data-id');
  if (!localStorageWatchedFilms.includes(movieId)) {
    localStorageWatchedFilms.push(movieId);
    localStorage.setItem('watchedFilms', JSON.stringify(localStorageWatchedFilms));
    Notiflix.Notify.success(`Film dodano!`);
  } else {
    Notiflix.Notify.failure(`Ten film został już dodany!`);
  }
}

function handleQueueBtnClick(event) {
  const queueBtn = event.target.closest('.queue-btn-modal');
  let movieId = queueBtn.getAttribute('data-id');
  if (!localStorageInQueue.includes(movieId)) {
    localStorageInQueue.push(movieId);
    localStorage.setItem('filmsInQueue', JSON.stringify(localStorageInQueue));
    Notiflix.Notify.success(`Film dodano!`);
  } else {
    Notiflix.Notify.failure(`Ten film został już dodany!`);
  }
}

function closeModal() {
  modal.style.display = 'none';
}

// movieCards.forEach(movieCard => {
//   movieCard.addEventListener('click', openModal);
// });

closeBtn.addEventListener('click', closeModal);
// modal.addEventListener('click', closeModal);

// modal.addEventListener('click', event => {
//   // Sprawdzamy, czy kliknięcie było na modalu
//   if (event.target.classList.contains('modal')) {
//   } else {
//     closeModal();
//   }
// });

window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};

window.onkeydown = function (e) {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
  }
};
