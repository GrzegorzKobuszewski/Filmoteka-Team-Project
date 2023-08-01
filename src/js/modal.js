const movieCards = document.querySelectorAll('.movie-card');
const modal = document.querySelector('.backdrop');
const closeBtn = document.querySelector('#close-btn');
import { html } from './pagination.js';

export function openModal() {
  //podstawiam zmienną html pod zawartość znacznika <div id='detalisMovie'>
  const detailsElement = document.getElementById('detailsMovie');
  if (detailsElement) {
    detailsElement.innerHTML = html;
  }

  modal.style.display = 'flex';
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
