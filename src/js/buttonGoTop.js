const goTop = document.querySelector('.go-top__button');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    goTop.classList.add('active');
  } else {
    goTop.classList.remove('active');
  }
});

function scrollToTop() {
  window.scrollTo(0, 0);
}

goTop.addEventListener('click', scrollToTop);

