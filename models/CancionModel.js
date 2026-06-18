class Cancion {
    constructor (id, titulo, artista, album, duracion, genero) {
        this.id = id;
        this.titulo = titulo;
        this.artista = artista;
        this.album = album;
        this.duracion = duracion;
        this.genero = genero;
    }    
}

module.exports = Cancion;