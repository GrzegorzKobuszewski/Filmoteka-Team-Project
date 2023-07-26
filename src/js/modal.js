const movieCard = document.querySelector('.movie-card');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('#close-btn');

function openModal() {
  modal.style.display = 'block';
}
function closeModal() {
  modal.style.display = 'none';
}
movieCard.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

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
