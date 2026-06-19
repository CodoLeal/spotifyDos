// public/js/admin.js

// Ruta base ajustada según tu app.use('/canciones', cancionRoutes) en server.js
const API_URL = '/canciones'; 
let listaCanciones = [];

// Instanciamos los modales de Bootstrap para manejarlos limpiamente desde JS
const modalAgregar = new bootstrap.Modal(document.getElementById('modalAgregar'));
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));


// ─── 1. CAPTURA Y DELEGACIÓN DE EVENTOS ───

// Escucha cuando el DOM está completamente cargado para listar las canciones
document.addEventListener('DOMContentLoaded', cargarCanciones);

// Escucha el envío del formulario para agregar canciones
document.getElementById('form-agregar').addEventListener('submit', guardarNuevaCancion);

// Escucha el envío del formulario para editar canciones
document.getElementById('form-editar').addEventListener('submit', actualizarCancion);

// Delegación de eventos en el tbody (captura clicks de Editar y Eliminar dinámicamente)
document.getElementById('tabla-canciones').addEventListener('click', (e) => {
    const botonEditar = e.target.closest('.btn-accion-editar');
    const botonEliminar = e.target.closest('.btn-accion-eliminar');

    if (botonEditar) {
        const id = parseInt(botonEditar.getAttribute('data-id'));
        prepararEditar(id);
    }

    if (botonEliminar) {
        const id = parseInt(botonEliminar.getAttribute('data-id'));
        eliminarCancion(id);
    }
});


// ─── 2. FUNCIONES OPERATIVAS (FETCH) ───

// [GET] Obtener y renderizar todas las canciones
async function cargarCanciones() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener el catálogo');

        listaCanciones = await res.json();
        const tbody = document.getElementById('tabla-canciones');
        tbody.innerHTML = ''; // Limpiar la tabla

        if (listaCanciones.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-secondary py-4">Catálogo vacío. Añade una canción.</td></tr>`;
            return;
        }

        listaCanciones.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td class="text-secondary fw-bold">#${c.id}</td>
                    <td class="text-white fw-bold">${c.titulo}</td>
                    <td>${c.artista}</td>
                    <td class="text-secondary">${c.album}</td>
                    <td>${c.duracion}</td>
                    <td><span class="badge bg-dark border border-secondary text-secondary">${c.genero}</span></td>
                    <td class="text-end">
                        <button class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1 btn-accion-editar" data-id="${c.id}">
                            <i class="bi bi-pencil-square me-1"></i>Editar
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-pill px-3 btn-accion-eliminar" data-id="${c.id}">
                            <i class="bi bi-trash3-fill me-1"></i>Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
        alert('Error al conectar con el servidor.');
    }
}

// [POST] Insertar nueva canción
async function guardarNuevaCancion(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Objeto con los 5 campos requeridos por tu cancionController.js
    const nuevaCancion = {
        titulo: formData.get('titulo'),
        artista: formData.get('artista'),
        album: formData.get('album'),
        duracion: formData.get('duracion'),
        genero: formData.get('genero')
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaCancion)
        });

        if (res.status === 201) {
            modalAgregar.hide(); // Cerrar modal
            e.target.reset();    // Limpiar formulario
            cargarCanciones();   // Refrescar tabla desde BD
        } else {
            const data = await res.json();
            alert('Error: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar guardar.');
    }
}

// Rellenar el formulario del modal de edición con los datos existentes
function prepararEditar(id) {
    const cancion = listaCanciones.find(c => c.id === id);
    if (!cancion) return;

    document.getElementById('editar-id').value = cancion.id;
    document.getElementById('editar-titulo').value = cancion.titulo;
    document.getElementById('editar-artista').value = cancion.artista;
    document.getElementById('editar-album').value = cancion.album;
    document.getElementById('editar-duracion').value = cancion.duracion;
    document.getElementById('editar-genero').value = cancion.genero;

    modalEditar.show(); // Abrir modal de edición
}

// [PUT] Actualizar canción por ID
async function actualizarCancion(e) {
    e.preventDefault();
    const id = document.getElementById('editar-id').value;
    const formData = new FormData(e.target);

    const cancionEditada = {
        titulo: formData.get('titulo'),
        artista: formData.get('artista'),
        album: formData.get('album'),
        duracion: formData.get('duracion'),
        genero: formData.get('genero')
    };

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cancionEditada)
        });

        if (res.ok) {
            modalEditar.hide();
            cargarCanciones(); // Refrescar vista
        } else {
            const data = await res.json();
            alert('Error al modificar: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar actualizar.');
    }
}

// [DELETE] Remover canción por ID
async function eliminarCancion(id) {
    if (!confirm('¿Seguro que deseas remover esta canción de la base de datos?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            cargarCanciones(); // Refrescar vista tras eliminar
        } else {
            const data = await res.json();
            alert('Error: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar eliminar.');
    }
}