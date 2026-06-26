// BOTON PA MODO VICHO
const htmlElement = document.querySelector('html');
const botonTema = document.getElementById('btn-tema');
const iconoTema = document.getElementById('tema-icon');
const textoTema = document.getElementById('tema-label');

botonTema.addEventListener('click', () => {

    const temaActual = htmlElement.getAttribute('data-bs-theme');

    if (temaActual === 'dark') {

        htmlElement.setAttribute('data-bs-theme', 'light');

        textoTema.textContent = 'Modo oscuro';
        iconoTema.classList.remove('bi-moon-stars-fill');
        iconoTema.classList.add('bi-sun-fill');

        botonTema.classList.remove('btn-outline-light');
        botonTema.classList.add('btn-outline-dark');

    } else {
        htmlElement.setAttribute('data-bs-theme', 'dark');

        textoTema.textContent = 'Modo claro';
        iconoTema.classList.remove('bi-sun-fill');
        iconoTema.classList.add('bi-moon-stars-fill');

        botonTema.classList.remove('btn-outline-dark');
        botonTema.classList.add('btn-outline-light');
    }

});