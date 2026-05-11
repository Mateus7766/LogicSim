const headerMenu = document.getElementById('header-menu');
const headerBtn = document.getElementById('header-btn');
const headerNav = document.getElementById('header-nav');
const headerDescBG = document.getElementById('header-descBG');
const navLinks = headerNav.querySelectorAll('a');
const body = document.querySelector('body');

let menuAberto = false;

function toggleMenu() {
    menuAberto = !menuAberto;
    
    if (menuAberto) {
        abrirMenu();
    } else {
        fecharMenu();
    }
}

function abrirMenu() {
    headerNav.classList.add('active');
    headerDescBG.classList.add('active');
    body.style.overflow = 'hidden';
}

function fecharMenu() {
    headerNav.classList.remove('active');
    headerDescBG.classList.remove('active');
    body.style.overflow = 'auto';
    menuAberto = false;
    mudarDePosicao();
}

headerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

headerDescBG.addEventListener('click', () => {
    fecharMenu();
});

headerNav.addEventListener('click', (e) => {
    if (e.target === headerNav) {
        fecharMenu();
    }
});

function mudarDePosicao(){

    if(menuAberto){
        headerNav.appendChild(headerBtn);
        headerBtn.classList.add('active')
    }else {
      headerMenu.appendChild(headerBtn);
      headerBtn.classList.remove('active');
      headerMenu.insertBefore(headerBtn, headerMenu.firstChild);
    }
}

headerBtn.addEventListener('click', mudarDePosicao)



