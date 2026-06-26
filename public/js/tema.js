const html      = document.documentElement;
const btnTema   = document.getElementById('btn-tema');
const temaIcon  = document.getElementById('tema-icon');
const temaLabel = document.getElementById('tema-label');

btnTema.addEventListener('click', () => {
    const esOscuro = html.getAttribute('data-bs-theme') === 'dark';
    html.setAttribute('data-bs-theme', esOscuro ? 'light' : 'dark');
    temaIcon.className    = esOscuro ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    temaLabel.textContent = esOscuro ? 'Modo oscuro' : 'Modo claro';

    document.body.style.background = esOscuro
        ? 'radial-gradient(circle at top left, #e8e0f5 0%, #f5f5f5 80%)'
        : 'radial-gradient(circle at top left, #1f132b 0%, #0a0a0a 80%)';
});