
const formulario = document.getElementById('loginForm');
const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');


const realizarLogin = async (e) => {
    e.preventDefault();

    mensajeError.textContent = '';
    mensajeError.classList.add('d-none');

    const username = inputUsername.value.trim();
    const password = inputPassword.value;

    if (!username || !password) {
        mensajeError.textContent = 'Completa todos los campos.';
        mensajeError.classList.remove('d-none');
        return;
    }

    try {
        const respuesta = await fetch('/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (respuesta.ok) {
            window.location.href = '/Index.html';
        } else {
            const datos = await respuesta.json();
            mensajeError.textContent = datos.error || 'Credenciales inválidas';
            mensajeError.classList.remove('d-none');
        }

    } catch (err) {
        mensajeError.textContent = `Error al conectar: ${err.message}`;
        mensajeError.classList.remove('d-none');
    }
};

formulario.addEventListener('submit', realizarLogin);