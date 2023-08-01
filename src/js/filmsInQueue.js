import Notiflix from 'notiflix';
import { renderFilmDetails } from './watchedFilms';

// debugger;
let localStorageInQueue = JSON.parse(localStorage.getItem('filmsInQueue'));
if (localStorageInQueue === null || localStorageInQueue.length === 0) {
  localStorage.setItem('filmsInQueue', JSON.stringify(['298618']));
}

// Tablica obejrzanych filmów
const queueIdArray = JSON.parse(localStorage.getItem('filmsInQueue'));
const inQueueArray = []; //do tej tablicy bedę wczytywać filmy ze szczegółami

for (let i = 1; i <= queueIdArray.length; i++) {
  inQueueArray.push(i);
}
renderFilmDetails(queueIdArray, 'queue');
// debugger;
export { inQueueArray };
export { localStorageInQueue };

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

// // console.log(inQueueArray);
// // renderFilmDetails(inQueueArray);
