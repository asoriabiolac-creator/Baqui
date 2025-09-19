const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdownMenu = document.querySelector('.dropdown-menu');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
});
