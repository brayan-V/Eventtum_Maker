# Eventtum Maker

## Descripción
Eventtum Maker es una aplicación de gestión de eventos diseñada para ayudarte a organizar y administrar tus eventos de manera sencilla y eficiente. Con Eventtum Maker, puedes crear, editar y eliminar eventos, así como buscar y filtrar eventos por ubicación y fecha.

## Requisitos
- Node.js
- MongoDB

## Instalación

### Clonar el Repositorio
1. Clona este repositorio:
   ```bash
   git clone https://github.com/brayan-V/Eventtum_Maker.git
   ```
### Configuración del Backend
2. Navega al directorio del servidor:
   ```bash
   cd Server
   ```   
3. Instala las dependencias del backend:
   ```bash
   npm install
   ```   
4. Crea un archivo .env en el directorio del servidor y configura las siguientes variables:
   ```plaintext
   MONGODB_URI=<TU_URI_DE_MONGODB>
   PORT=5000
   TOKEN_SECRET_KEY=<TU_SECRETO_DE_JWT>
   ```   
 5. Inicia el servidor:
 ```bash
   npm run dev
 ```
### Configuración del Frontend
6. Navega al directorio del cliente:
   ```bash
     cd Client
   ```
7. Instala las dependencias del frontend:
   ```bash
     npm install
   ``` 
8. Inicia la aplicación React:
   ```bash
     npm run dev
   ```
### Uso de la Aplicación
1. Accede a la aplicación en http://localhost:5173. o el que genere la ejecución del comando

2. Regístrate como usuario y utiliza las funcionalidades CRUD y de autenticación.

### Dependencias
### Backend
- express

- mongoose

- cors

- dotenv

- bcryptjs

- jsonwebtoken

### Frontend
- react

- react-dom

- vite
  
- Material-UI
  
- Zod

### Características
- Registro e Inicio de Sesión: Los usuarios pueden registrarse y acceder a sus cuentas de manera segura.

- Creación de Eventos: Crea eventos con detalles como nombre, descripción, fecha, hora y ubicación.

- Edición de Eventos: Edita los eventos existentes para actualizar cualquier detalle.

- Eliminación de Eventos: Elimina eventos de forma segura, con confirmación para evitar errores.

- Búsqueda y Filtrado: Busca y filtra eventos por ubicación y fecha para encontrar fácilmente lo que necesitas.

- Interfaz Responsiva: La aplicación se adapta a diferentes tamaños de pantalla, con una disposición de tarjetas de eventos que optimiza el uso del espacio.
### Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más información.