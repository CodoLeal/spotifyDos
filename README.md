
Ahora mismo no hay nada hecho, tenemos que repartirnos los roles.
El proyecto ya está inicializado con [npm init -y]
El proyecto ya tiene integrado express [npm install express]
El proyecto ya tiene integrado mysql2 [npm install mysql2]

Falta:
Todo

No nada

1. Integrantes del Grupo:

Martin Hormazabal (Backend & DB Lead): Responsable de la inicialización del proyecto y configuración central del servidor (server.js) y la base de datos (config/db.js).
Desarrolló los modelos de la aplicación incluyendo las consultas SQL directas (models/UsuarioModel.js y models/CancionModel.js).
Además, implementó la lógica de autenticación en el backend verificando las credenciales contra MySQL
y protegiendo el acceso al panel mediante middlewares de sesión. Administró el repositorio central en GitHub.

Vicente Gonzalez (Controladores & CRUD): Encargado de estructurar las rutas del administrador y programar la lógica del negocio en el backend (controllers/cancionController.js), 
creando los métodos completos para leer, crear, actualizar y eliminar canciones. 
Desarrolló y estructuró la vista del Panel de Administración (public/admin), 
conectando exitosamente los formularios HTML con los métodos del controlador para reflejar los cambios directamente en phpMyAdmin.

Bárbara Granifo (Autenticación & Frontend JS): Diseñó la interfaz responsiva con Bootstrap y la estética del sitio mediante CSS personalizado (public/css/styles.css). Programó la lógica del servidor para el inicio de sesión (routes/usuarios.js y controllers/auth.controller.js) conectada a MySQL. Además, desarrolló el script central (public/js/login.js) para validar campos vacíos y desplegar alertas de error en pantalla.

Allan Arrey (Vista Pública & Docs): Desarrolló la Landing Page pública o vista de inicio (public/index.html) utilizando Bootstrap, 
implementando el diseño responsivo, la barra de navegación y el botón de redirección al Login.
Fue responsable de redactar íntegramente la documentación del sistema (README.md) 
y de realizar las pruebas de control de calidad del despliegue (clonación, instalación de dependencias, 
conexión a BD y ejecución) garantizando el funcionamiento del proyecto desde cero para su evaluación en laboratorio.


2. Descripcion del Proyecto:

Spotify2 es una aplicación web perteneciente al area tematica de Entretenimiento (Musica). 
El sistema resuelve la necesidad de gestionar y presentar un catálogo musical digital de forma eficiente pues
ofrece a los visitantes una vista publica para descubrir albumes recomendados y proporciona al personal de la empresa una
interfaz de administracion comoda y eficiente para sus tareas diarias.



3. Requisitos Previos:

Para ejecutar este proyecto en un entorno local, es necesario contar con el siguiente software instalado:

Node.js: Entorno de ejecucion para el servidor backend (se recomienda la version 18.x o superior).

XAMPP (o similar): Paquete de software para gestionar el servidor de base de datos MySQL de forma local.

Navegador Web: Google Chrome, Firefox o Edge en sus versiones mas recientes para la correcta visualización de Bootstrap 5.



4. Instalacion Paso a Paso:

4.1 Clonar el Repositorio:

Abra su terminal y ejecute el siguiente comando:
git clone https://github.com/CodoLeal/spotifyDos.git
cd spotifyDos

4.2 Importar la Base de Datos:
Inicie Apache y MySQL en su panel de XAMPP.
Ingrese a http://localhost/phpmyadmin/ en su navegador.
Cree una nueva base de datos llamada exactamente spotify2_db.
Seleccione la base de datos, vaya a la pestaña Importar,
elija el archivo db.sql ubicado en la raíz del proyecto y haga clic en Continuar/Importar

4.3 Instalar Dependencias:
En la terminal integrada de VS Code (asegurándose de estar dentro de la carpeta raíz del proyecto), ejecute:
npm install

4.4 Ejecutar el Servidor:
Inicie la Aplicacion con el siguiente Comando:
node server.js

Abra su navegador e ingrese a http://localhost:3000 para ver la vista pública.

5. Configuracion de la Base de Datos:

Para que el sistema funcione correctamente, se debe importar la estructura y los datos iniciales. 
El archivo de exportación se encuentra en la raíz del proyecto bajo el db.sql.

Nombre de la base de datos: spotify2_db

Usuario: root

Contraseña: (vacia)



6. Credenciales de Prueba:

Para acceder al panel de administración protegido y evaluar las operaciones CRUD del sistema,
utilice la siguiente cuenta preconfigurada en la base de datos:

Usuario: admin

Contraseña: 123



8. Estructura del Proyecto:

El sistema sigue estrictamente el patrón de arquitectura MVC. A continuación, se detalla el arbol de directorios:

/config/: Archivos de configuracion general, incluyendo la conexion a la base de datos (db.js).

/controllers/: Contiene la logica principal de la aplicación y procesa las peticiones entre la vista y el modelo.

/model/: Archivos encargados de la interaccion directa con MySQL y la ejecucion de consultas SQL.

/public/: Directorio de recursos estáticos accesibles por el navegador y LandingPage (imágenes, CSS y archivos como app.js para el frontend y index.html).

server.js: Archivo principal ubicado en la raiz del proyecto que inicializa y levanta el servidor web.

db.sql: Script de base de datos listo para importar en phpMyAdmin.
