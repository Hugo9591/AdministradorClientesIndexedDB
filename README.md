# Administrador de Clientes

## Descripción
El proyecto es un Administrador de Clientes que permite gestionar información de clientes en una base de datos IndexedDB. 
Incluye funcionalidades para agregar, editar y eliminar clientes mediante una interfaz intuitiva y responsive construida con Tailwind CSS. 
El sistema valida los datos de entrada y evita duplicados de correo electrónico. La lógica está completamente manejada con JavaScript, distribuyendo las responsabilidades 
en varios archivos para un código limpio.


La aplicación cuenta con tres vistas principales:
1. Clientes: Muestra una tabla con los clientes registrados, incluyendo opciones para editar o eliminar.
2. Nuevo Cliente: Permite agregar un nuevo cliente mediante un formulario.
3. Editar Cliente: Carga los datos de un cliente existente para su edición.

## Características
- Registro de clientes: Formulario para agregar clientes con validaciones en los campos.
- Edición de clientes: Actualización de información con datos precargados en el formulario.
- Eliminación segura: Confirmación antes de eliminar un registro.
- Prevención de duplicados: No se permite agregar clientes con el mismo correo electrónico.
- Responsive: Diseño adaptado a dispositivos móviles gracias a **Tailwind CSS**.
- Persistencia local: Uso de **IndexedDB** para almacenar los datos de manera local.
- Modularidad: Lógica dividida en varios archivos JavaScript para mayor organización.

## Tecnologías utilizadas
- HTML: Estructura de las páginas.
- CSS (Tailwind): Estilos y diseño responsive.
- JavaScript: Manejo de la lógica y la interacción con IndexedDB.

## Estructura de archivos
- index.html: Página principal con la lista de clientes
- nuevoCliente.html: Página con el formulario para agregar nuevos clientes
- editarCliente.html: Página con el formulario para editar clientes
- css: Archivo de estilos personalizados con Tailwind CSS ├──
- js
  - app.js: Manejo de la tabla y la impresión de registros
  - nuevoCliente.js: Lógica para agregar nuevos clientes
  - editar.js: Lógica para editar clientes existentes
  - funciones.js: Funciones reutilizables

## Uso
1. Agregar cliente:
  - clic en la opcion 'Nuevo Cliente'.
  - Llena el formulario con nombre, correo, teléfono y empresa.
  - Haz clic en "Agregar Cliente". Serás redirigido automáticamente a la lista de clientes.

2. Editar cliente:
  - En la tabla de clientes, haz clic en "Editar".
  - Los datos del cliente se cargarán automáticamente en el formulario.
  - Realiza las modificaciones necesarias y guarda los cambios.

3. Eliminar cliente:
  - En la tabla de clientes, haz clic en "Eliminar".
  - Confirma la acción para borrar el registro de la base de datos.
    
4. Validaciones
  - Todos los campos son obligatorios.
  - No se permiten duplicados por correo electrónico.
  - Confirmación antes de eliminar un cliente.

## Instalación
1. Clona este repositorio:
   git clone https://github.com/Hugo9591/AdministradorClientesIndexedDB.git

2. Abre el archivo index.html en tu navegador.
