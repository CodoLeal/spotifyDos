

Bárbara Granifo
Qué hice exactamente: Me encargué de diseñar y programar todo el login y definir la estética visual del sitio.

Frontend: Armé el diseño (public/login.html) usando Bootstrap para que sea responsivo, ocupando sus filas y columnas para que todo quede bien centrado.

Diseño Personalizado: Para cambiar el color verde de Spotify, creé un archivo CSS externo (public/css/styles.css) para darle un estilo diferente. Cambié los botones por degradados y configuré los cuadros de texto para que brillen al hacer clic en ellos.

Validación en el login: Programé la lógica del formulario (public/js/login.js). Si el usuario se equivoca en la clave o ingresa un usuario que no existe, aparece una alerta roja ahí mismo avisando del error sin recargar la página. Si todo está bien, lo manda altiro al panel de control.

Backend y Base de Datos: Configuré las rutas (routes/usuarios.js) y el controlador (controllers/auth.controller.js) en el servidor. Programé la lógica para recibir los datos del login, revisar en MySQL si el usuario y la contraseña son correctos, y avisarle a la pantalla si da el acceso o no.











Ahora mismo no hay nada hecho, tenemos que repartirnos los roles.
El proyecto ya está inicializado con [npm init -y]
El proyecto ya tiene integrado express [npm install express]
El proyecto ya tiene integrado mysql2 [npm install mysql2]

Falta:
Todo

No nada


2. (prototipo)
Spotify2(? es una aplicación web perteneciente al area tematica de Entretenimiento (Musica). 
El sistema resuelve la necesidad de gestionar y presentar un catálogo musical digital de forma eficiente pues
ofrece a los visitantes una vista publica para descubrir albumes recomendados y proporciona al personal de la empresa una
interfaz de administracion comoda y eficiente para sus tareas diarias.



3. (prototipo)
Para ejecutar este proyecto en un entorno local, es necesario contar con el siguiente software instalado:

Node.js: Entorno de ejecucion para el servidor backend (se recomienda la version 18.x o superior).

XAMPP (o similar): Paquete de software para gestionar el servidor de base de datos MySQL de forma local.

Navegador Web: Google Chrome, Firefox o Edge en sus versiones mas recientes para la correcta visualización de Bootstrap 5.



5. (prototipo)
Para que el sistema funcione correctamente, se debe importar la estructura y los datos iniciales. 
El archivo de exportación se encuentra en la raíz del proyecto bajo el nombre noseXD.

Nombre de la base de datos: nose XD

Usuario: root

Contraseña: (vacia no nada)



8. (prototipo)
El sistema sigue estrictamente el patrón de arquitectura MVC. A continuación, se detalla el arbol de directorios:

/config/: Archivos de configuracion general, incluyendo la conexion a la base de datos (db.js).

/controllers/: Contiene la logica principal de la aplicación y procesa las peticiones entre la vista y el modelo.

/model/: Archivos encargados de la interaccion directa con MySQL y la ejecucion de consultas SQL.

/public/: Directorio de recursos estáticos accesibles por el navegador (imágenes, CSS y archivos como app.js para el frontend).

/views/: Archivos de interfaz grafica y plantillas HTML, incluyendo la vista publica (index.html) y el panel de administracion.

server.js: Archivo principal ubicado en la raiz del proyecto que inicializa y levanta el servidor web.

database.sql: Script de base de datos listo para importar en phpMyAdmin.

README.md: Este archivo de documentacion con las instrucciones de despliegue
martin: APRENDI A USAR GIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIITHUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUB
PD: Nonada
