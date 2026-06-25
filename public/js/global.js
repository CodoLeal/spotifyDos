//carga del layout
fetch('/navbar.html') 
    .then(respuesta => respuesta.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;

        activarModoOscuro();
    });

fetch('/footer.html')
    .then(respuesta => respuesta.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    });

//boton cambio tema
function activarModoOscuro() {
    const htmlElement = document.querySelector('html');
    const botonTema = document.getElementById('btn-tema');
    const iconoTema = document.getElementById('tema-icon');
    const textoTema = document.getElementById('tema-label');


    const temaGuardado = localStorage.getItem('temaPreferido');

    if (temaGuardado === 'light') {
        htmlElement.setAttribute('data-bs-theme', 'light');
        if (botonTema) {
            textoTema.textContent = 'Modo oscuro';
            iconoTema.classList.remove('bi-moon-stars-fill');
            iconoTema.classList.add('bi-sun-fill');
            botonTema.classList.remove('btn-outline-light');
            botonTema.classList.add('btn-outline-dark');
        }
    }

    if (botonTema) {
        botonTema.addEventListener('click', () => {
            const temaActual = htmlElement.getAttribute('data-bs-theme');

            if (temaActual === 'dark') {
                htmlElement.setAttribute('data-bs-theme', 'light');
                localStorage.setItem('temaPreferido', 'light');

                textoTema.textContent = 'Modo oscuro';
                iconoTema.classList.remove('bi-moon-stars-fill');
                iconoTema.classList.add('bi-sun-fill');
                botonTema.classList.remove('btn-outline-light');
                botonTema.classList.add('btn-outline-dark');
            } else {
                htmlElement.setAttribute('data-bs-theme', 'dark');
                localStorage.setItem('temaPreferido', 'dark');

                textoTema.textContent = 'Modo claro';
                iconoTema.classList.remove('bi-sun-fill');
                iconoTema.classList.add('bi-moon-stars-fill');
                botonTema.classList.remove('btn-outline-dark');
                botonTema.classList.add('btn-outline-light');
            }
        });
    }
}