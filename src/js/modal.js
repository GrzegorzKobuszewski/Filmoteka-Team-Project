const movieCards = document.querySelectorAll('.movie-card');
const modal = document.querySelectorAll('.modal');
const closeBtn = document.querySelector('#close-btn');

function openModal() {
  modal.style.display = 'block';
}
function closeModal() {
  modal.style.display = 'none';
}

movieCards.forEach(movieCard => {
  movieCard.addEventListener('click', openModal);
});

closeBtn.addEventListener('click', closeModal);

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};
