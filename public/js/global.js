// ==========================================
// CARGA DEL LAYOUT
// ==========================================
fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;
        activarModoOscuro();
        inicializarNavbarSeguridad(); // Aquí controlamos todo lo del usuario
    });

fetch('/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    });

// ==========================================
// GESTIÓN DE SESIÓN Y SEGURIDAD
// ==========================================
function inicializarNavbarSeguridad() {
    const usuario = localStorage.getItem('usuario');
    const btnAdmin = document.getElementById('btn-admin'); // Asegúrate que tu botón tenga este ID
    const btnLogin = document.querySelector('a[href="/login.html"]');
    
    // 1. Lógica de UI según sesión
    if (usuario) {
        // Si hay sesión, mostramos el Admin y cambiamos el botón a "Cerrar"
        if (btnAdmin) btnAdmin.style.display = 'block';
        if (btnLogin) {
            btnLogin.innerHTML = '<i class="bi bi-box-arrow-right me-1"></i>Cerrar Sesión';
            btnLogin.href = "#";
            btnLogin.addEventListener('click', () => {
                localStorage.removeItem('usuario');
                window.location.reload();
            });
        }
    } else {
        // Si NO hay sesión, ocultamos el Admin (el HTML debería tener style="display: none")
        if (btnAdmin) btnAdmin.style.display = 'none';
    }

    // 2. Proteger elementos restringidos
    document.querySelectorAll('.restringido').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!localStorage.getItem('usuario')) {
                e.preventDefault();
                // Si el elemento es el de Admin, enviamos al login, si es algo menor, abrimos modal
                if (item.id === 'btn-admin') {
                    window.location.href = '/login.html';
                } else {
                    const miModal = new bootstrap.Modal(document.getElementById('modalLogin'));
                    miModal.show();
                }
            }
        });
    });
}

// ==========================================
// BOTÓN CAMBIO TEMA
// ==========================================
function activarModoOscuro() {
    const htmlElement = document.querySelector('html');
    const botonTema = document.getElementById('btn-tema');
    if (!botonTema) return;

    const iconoTema = document.getElementById('tema-icon');
    const textoTema = document.getElementById('tema-label');
    const temaGuardado = localStorage.getItem('temaPreferido') || 'dark';

    // Aplicar estado inicial
    htmlElement.setAttribute('data-bs-theme', temaGuardado);
    
    botonTema.addEventListener('click', () => {
        const nuevoTema = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-bs-theme', nuevoTema);
        localStorage.setItem('temaPreferido', nuevoTema);
        
        // Actualizar UI del botón
        textoTema.textContent = nuevoTema === 'dark' ? 'Modo claro' : 'Modo oscuro';
        iconoTema.className = nuevoTema === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
        botonTema.className = nuevoTema === 'dark' ? 'btn btn-outline-light btn-sm' : 'btn btn-outline-dark btn-sm';
    });
}