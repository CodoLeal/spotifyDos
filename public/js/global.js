
fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;
        activarModoOscuro();
        inicializarNavbarSeguridad();
    });

fetch('/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    });

document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn-reproducir, .btn-playlist, .btn-protegido, .restringido');
    
    if (target) {
        const usuario = localStorage.getItem('usuario');
        
        if (!usuario) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalElement = document.getElementById('modalLogin');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn("El modal #modalLogin no existe en este HTML.");
            }
        }
    }
}, true);

function inicializarNavbarSeguridad() {
    const usuario = localStorage.getItem('usuario');
    const btnAdmin = document.getElementById('btn-admin');
    const btnLogin = document.querySelector('a[href="/login.html"]');
    
    if (usuario) {
        if (btnAdmin) btnAdmin.style.display = 'block';
        if (btnLogin) {
            btnLogin.innerHTML = '<i class="bi bi-box-arrow-right me-1"></i>Cerrar Sesión';
            btnLogin.addEventListener('click', () => {
                localStorage.removeItem('usuario');
                window.location.reload();
            });
        }
    }
}

function activarModoOscuro() {
    const htmlElement = document.querySelector('html');
    const botonTema = document.getElementById('btn-tema');
    if (!botonTema) return;

    const iconoTema = document.getElementById('tema-icon');
    const textoTema = document.getElementById('tema-label');
    const temaGuardado = localStorage.getItem('temaPreferido') || 'dark';

    htmlElement.setAttribute('data-bs-theme', temaGuardado);
    
    botonTema.addEventListener('click', () => {
        const nuevoTema = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-bs-theme', nuevoTema);
        localStorage.setItem('temaPreferido', nuevoTema);
        
        textoTema.textContent = nuevoTema === 'dark' ? 'Modo claro' : 'Modo oscuro';
        iconoTema.className = nuevoTema === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
        botonTema.className = nuevoTema === 'dark' ? 'btn btn-outline-light btn-sm' : 'btn btn-outline-dark btn-sm';
    });
}