const API_URL = '/canciones'; 
const API_USUARIOS_URL = '/usuarios';
let listaCanciones = [];

const modalAgregar = new bootstrap.Modal(document.getElementById('modalAgregar'));
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
const modalAgregarUsuario = new bootstrap.Modal(document.getElementById('modalAgregarUsuario'));


document.addEventListener('DOMContentLoaded', () => {
    cargarCanciones();
    cargarUsuarios();
});

document.getElementById('form-agregar').addEventListener('submit', guardarNuevaCancion);

document.getElementById('form-editar').addEventListener('submit', actualizarCancion);

document.getElementById('form-agregar-usuario').addEventListener('submit', guardarNuevoUsuario);

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

async function guardarNuevaCancion(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
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
            modalAgregar.hide();
            e.target.reset();
            cargarCanciones();   
        } else {
            const data = await res.json();
            alert('Error: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar guardar.');
    }
}

function prepararEditar(id) {
    const cancion = listaCanciones.find(c => c.id === id);
    if (!cancion) return;

    document.getElementById('editar-id').value = cancion.id;
    document.getElementById('editar-titulo').value = cancion.titulo;
    document.getElementById('editar-artista').value = cancion.artista;
    document.getElementById('editar-album').value = cancion.album;
    document.getElementById('editar-duracion').value = cancion.duracion;
    document.getElementById('editar-genero').value = cancion.genero;

    modalEditar.show();
}

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
            cargarCanciones();
        } else {
            const data = await res.json();
            alert('Error al modificar: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar actualizar.');
    }
}

async function eliminarCancion(id) {
    if (!confirm('¿Seguro que deseas remover esta canción de la base de datos?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            cargarCanciones();
        } else {
            const data = await res.json();
            alert('Error: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar eliminar.');
    }
}

async function cargarUsuarios() {
    try {
        const res = await fetch(API_USUARIOS_URL);
        if (!res.ok) throw new Error('Error al obtener los usuarios');

        const listaUsuarios = await res.json();
        const tbody = document.getElementById('tabla-usuarios');
        tbody.innerHTML = '';

        if (listaUsuarios.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-secondary py-4">No hay usuarios registrados.</td></tr>`;
            return;
        }

        listaUsuarios.forEach(u => {
            tbody.innerHTML += `
                <tr>
                    <td class="text-secondary fw-bold">#${u.id}</td>
                    <td class="text-white fw-bold">
                        <i class="bi bi-person-fill me-2 text-secondary"></i>${u.username}
                    </td>
                    <td class="text-end">
                        <span class="badge bg-dark border border-secondary text-secondary">Administrador</span>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
        alert('Error al conectar con el servidor para listar usuarios.');
    }
}

async function guardarNuevoUsuario(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const nuevoUsuario = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    try {
        const res = await fetch(API_USUARIOS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoUsuario)
        });

        if (res.status === 201) {
            modalAgregarUsuario.hide();
            e.target.reset();
            cargarUsuarios();
        } else {
            const data = await res.json();
            alert('Error: ' + (data.error || 'No se pudo crear el usuario.'));
        }
    } catch (err) {
        console.error(err);
        alert('Error de red al intentar guardar el usuario.');
    }
}