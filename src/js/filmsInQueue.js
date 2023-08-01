// import Notiflix from 'notiflix';
// import { renderFilmDetails } from './watchedFilms';

// let localStorageInQueue = JSON.parse(localStorage.getItem('filmsInQueue'));
// if (localStorageInQueue === null) {
//   localStorage.setItem('filmsInQueue', JSON.stringify([]));
// }

// //słuchanie czy kliknie w WatchedBtn:
// async function handleInQueueBtnClick(event) {
//   const queueBtn = event.target.closest('.queue-btn-modal');
//   let movieId = await queueBtn.getAttribute('data-id');
//   if (!localStorageInQueue.includes(movieId)) {
//     localStorageInQueue.push(movieId);
//     localStorage.setItem('filmsInQueue', JSON.stringify(localStorageInQueue));
//   } else {
//     Notiflix.Notify.failure(`Ten film został już dodany!`);
//   }
// }

// const modalElem = document.querySelector('.modal');

// // Dodajemy słuchacza zdarzeń dla całego modala
// modalElem.addEventListener('click', event => {
//   // Sprawdzamy, czy kliknięcie było na przycisku watched
//   if (event.target.classList.contains('queue-btn-modal')) {
//     // Wywołujemy funkcję tylko wtedy, gdy kliknięto przycisk
//     handleInQueueBtnClick(event);
//   }
// });
// // filmy w kolejce
// export let inQueueArray = JSON.parse(localStorage.getItem('filmsInQueue'));
// // console.log(inQueueArray);
// // renderFilmDetails(inQueueArray);
