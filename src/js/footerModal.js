const footerButton = document.querySelector('.footer__button');
const footerModal = document.querySelector('.footer__modal');
const footerCloseBtn = document.querySelector('.footer__close-btn');

function openFooterModal() {
  footerModal.style.display = 'block';
}
function closeFooterModal() {
  footerModal.style.display = 'none';
}
footerButton.addEventListener('click', openFooterModal);
footerCloseBtn.addEventListener('click', closeFooterModal);

window.onclick = function (e) {
  if (e.target == footerModal) {
    footerModal.style.display = 'none';
  }
};
