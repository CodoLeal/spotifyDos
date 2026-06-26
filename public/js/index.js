//moodo vicho
    const htmlElement = document.querySelector('html');
    const botonTema = document.getElementById('btn-tema');
    const iconoTema = document.getElementById('tema-icon');
    const textoTema = document.getElementById('tema-label');

    if (botonTema) {
        botonTema.addEventListener('click', () => {
            const temaActual = htmlElement.getAttribute('data-bs-theme');
            if (temaActual === 'dark') {
                htmlElement.setAttribute('data-bs-theme', 'light');
                if (textoTema) textoTema.textContent = 'Modo oscuro';
                if (iconoTema) iconoTema.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
                botonTema.classList.replace('btn-outline-light', 'btn-outline-dark');
            } else {
                htmlElement.setAttribute('data-bs-theme', 'dark');
                if (textoTema) textoTema.textContent = 'Modo claro';
                if (iconoTema) iconoTema.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
                botonTema.classList.replace('btn-outline-dark', 'btn-outline-light');
            }
        });
    }

    const botonesReproducir = document.querySelectorAll('.btn-reproducir');
    const reproductor = document.getElementById('player-simulado');
    const progressBar = document.querySelector('#player-simulado .progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const btnPlayPause = document.querySelector('#player-simulado .btn-primary');

    let playbackInterval;
    let segundosTranscurridos = 0;
    const duracionTotal = 230;

    function iniciarContador() {
        clearInterval(playbackInterval);

        playbackInterval = setInterval(() => {
            if (segundosTranscurridos < duracionTotal) {
                segundosTranscurridos++;

                const porcentaje = (segundosTranscurridos / duracionTotal) * 100;
                if (progressBar) progressBar.style.width = porcentaje + '%';

                const mins = Math.floor(segundosTranscurridos / 60);
                const secs = segundosTranscurridos % 60;
                if (currentTimeDisplay) {
                    currentTimeDisplay.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                }
            } else {
                clearInterval(playbackInterval);
            }
        }, 1000);
    }

    botonesReproducir.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const img = card.querySelector('.card-img-top').src;
            const titulo = card.querySelector('.card-title').innerText;
            const artista = card.querySelector('p.text-secondary').innerText;

            segundosTranscurridos = 0;
            if (progressBar) progressBar.style.width = '0%';
            if (currentTimeDisplay) currentTimeDisplay.innerText = '0:00';

            document.getElementById('player-img').src = img;
            document.getElementById('player-title').innerText = titulo;
            document.getElementById('player-artist').innerText = artista;

            reproductor.classList.remove('d-none');
            const icono = btnPlayPause.querySelector('i');
            icono.classList.replace('bi-play-fill', 'bi-pause-fill');

            iniciarContador();
        });
    });

    if (btnPlayPause) {
        btnPlayPause.addEventListener('click', () => {
            const icono = btnPlayPause.querySelector('i');

            if (icono.classList.contains('bi-pause-fill')) {
                clearInterval(playbackInterval);
                icono.classList.replace('bi-pause-fill', 'bi-play-fill');
            } else {
                icono.classList.replace('bi-play-fill', 'bi-pause-fill');
                iniciarContador();
            }
        });
    };