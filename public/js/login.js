document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('loginForm');
    const mensajeError = document.getElementById('mensaje-error');

    if (!formulario) return;

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (mensajeError) {
            mensajeError.textContent = '';
            mensajeError.classList.add('d-none');
        }

        try {
            const respuesta = await fetch('/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (respuesta.ok) {
                localStorage.setItem('usuario', username);
                window.location.href = '/Index.html'; 
            } else {
                const datos = await respuesta.json();
                if (mensajeError) {
                    mensajeError.textContent = datos.error || 'Credenciales inválidas';
                    mensajeError.classList.remove('d-none');
                }
            }
        } catch (err) {
            console.error("Error:", err);
            if (mensajeError) {
                mensajeError.textContent = 'Error de conexión con el servidor.';
                mensajeError.classList.remove('d-none');
            }
        }
    });
});