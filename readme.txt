# API REST con Node.js, Express, JWT y Roles (MySQL)

Esta es una API REST completa construida con Node.js y Express, que incluye un sistema de autenticación robusto con JWT y refresh tokens, un CRUD para la gestión de productos, y un sistema de autorización basado en roles. La base de datos utilizada es **MySQL** con Sequelize como ORM.

## Características

* **Autenticación JWT**: Registro e inicio de sesión de usuarios con tokens de acceso JWT.
* **Refresh Tokens**: Mecanismo para renovar tokens de acceso sin necesidad de reautenticación constante.
* **CRUD de Productos**: Operaciones completas (Crear, Leer, Actualizar, Eliminar) para la entidad `Producto`.
* **Control de Acceso Basado en Roles**: Implementación de roles `admin` y `user` con diferentes niveles de acceso a las rutas.
* **Base de Datos Relacional**: Conexión y persistencia de datos con **MySQL** utilizando Sequelize como ORM.
* **Estructura Modular**: Código organizado en controladores, modelos, rutas y middlewares.
* **Variables de Entorno**: Uso de `.env` para la configuración sensible.

## Tecnologías Utilizadas

* Node.js
* Express.js
* MySQL / Sequelize
* jsonwebtoken
* bcryptjs
* dotenv
* nodemon (para desarrollo)

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* [Node.js](https://nodejs.org/es/) (versión 14 o superior recomendada)
* [npm](https://www.npmjs.com/) (viene con Node.js)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) (o un servicio MySQL alojado)

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu_usuario/nombre-del-proyecto.git](https://github.com/tu_usuario/nombre-del-proyecto.git)
    cd nombre-del-proyecto
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

    ```
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_mysql
    DB_NAME=nombre_de_tu_base_de_datos_mysql
    JWT_SECRET=tu_secreto_jwt_muy_seguro
    JWT_REFRESH_SECRET=tu_secreto_refresh_jwt_muy_seguro
    JWT_EXPIRATION_TIME=1h
    JWT_REFRESH_EXPIRATION_TIME=7d
    ```
    * `DB_HOST`: Host de tu servidor MySQL (ej: `localhost`).
    * `DB_USER`: Usuario de tu base de datos MySQL.
    * `DB_PASSWORD`: Contraseña de tu usuario MySQL.
    * `DB_NAME`: Nombre de la base de datos que deseas usar (asegúrate de crearla en tu servidor MySQL, por ejemplo, usando `CREATE DATABASE nombre_de_tu_base_de_datos_mysql;` en MySQL Workbench o la línea de comandos).
    * `JWT_SECRET`: Una cadena secreta aleatoria y segura para firmar los tokens de acceso.
    * `JWT_REFRESH_SECRET`: Una cadena secreta diferente y segura para firmar los refresh tokens.
    * `JWT_EXPIRATION_TIME`: Tiempo de expiración para los tokens de acceso (ej: `1h`, `15m`).
    * `JWT_REFRESH_EXPIRATION_TIME`: Tiempo de expiración para los refresh tokens (ej: `7d`, `30d`).

4.  **Inicia el servidor:**

    * **Modo desarrollo (con `nodemon` para reinicio automático):**
        ```bash
        npm run dev
        ```
    * **Modo producción:**
        ```bash
        npm start
        ```

    El servidor se ejecutará en `http://localhost:3000` (o el puerto que hayas configurado en `.env`).
    Sequelize se encargará de crear las tablas `users` y `products` en tu base de datos MySQL al iniciar el servidor por primera vez (o de actualizarlas si usas `alter: true`).

## Uso de la API

Puedes usar una herramienta como Postman, Insomnia o `curl` para probar los endpoints.

### Autenticación

* **Registro de Usuario:**
    `POST /api/auth/register`
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123",
      "role": "user" // o "admin"
    }
    ```

* **Inicio de Sesión de Usuario:**
    `POST /api/auth/login`
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
    Respuesta exitosa incluye `accessToken` y `refreshToken`.

* **Renovar Token de Acceso:**
    `POST /api/auth/refresh`
    ```json
    {
      "refreshToken": "el_refresh_token_obtenido_en_login"
    }
    ```

### Productos (CRUD)

**Nota**: Para las rutas protegidas (`POST`, `PUT`, `DELETE`), debes incluir el `accessToken` en el encabezado `Authorization: Bearer <your_access_token>`. Las rutas de creación, actualización y eliminación de productos solo son accesibles para usuarios con el rol `admin`.

* **Obtener Todos los Productos:**
    `GET /api/products` (Público)

* **Obtener Producto por ID:**
    `GET /api/products/:id` (Público)

* **Crear Nuevo Producto:**
    `POST /api/products` (Requiere `admin` role)
    ```json
    {
      "name": "Laptop Gamer",
      "description": "Una potente laptop para juegos.",
      "price": 1200,
      "stock": 50
    }
    ```

* **Actualizar Producto:**
    `PUT /api/products/:id` (Requiere `admin` role)
    ```json
    {
      "name": "Laptop Gamer Pro",
      "price": 1350
    }
    ```

* **Eliminar Producto:**
    `DELETE /api/products/:id` (Requiere `admin` role)

## Roles y Acceso

* **`user`**: Puede ver todos los productos.
* **`admin`**: Puede ver, crear, actualizar y eliminar productos. También puede crear otros usuarios (incluyendo administradores) mediante el registro.



