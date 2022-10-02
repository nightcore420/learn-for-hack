const navbarToggle = document.querySelector('.navbar-toggle input');
const nav = document.querySelector('nav ul');

navbarToggle.addEventListener('click', function(){
  nav.classList.toggle('slide');
});