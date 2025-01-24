(function(){
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');
    const noResultado = document.createElement('p');

    document.addEventListener('DOMContentLoaded', function(){
        crearDB();
        //MostrarClientes si se abre la BD
        if(window.indexedDB.open('crm', 1)){
            obtenerClientes();
        }

        listadoClientes.addEventListener('click', eliminarRegistro);
    });

    //Crear BD
    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function(){
            console.log('Hubo un error al crear la BD');
        }

        crearDB.onsuccess = function(){
            console.log('Se creo la BD ' +  crearDB.result.name + ' con exito.');
            DB = crearDB.result;
        }

        crearDB.onupgradeneeded = function (e){
            const db = e.target.result;
            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true
            });

            //Crear diferentes campos
            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

            console.log('Lista creada'); 
        }
    }


    function obtenerClientes(){
        hayDatos();
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error al abrir la BD para obtener clientes');
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;

            //transaction para acceder a un object store
            const objectStore = DB.transaction('crm').objectStore('crm');//crm nombre tabla

            //objectStore.openCursor() recorrer a todos los regitros almacenadaos en el objectStore
            objectStore.openCursor().onsuccess = function(e){
                const cursor = e.target.result;

                if(cursor){
                    const { nombre, empresa, email, telefono, id } = cursor.value;

                    listadoClientes.innerHTML += `<tr>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                        <p class="text-gray-700">${telefono}</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                        <p class="text-gray-600">${empresa}</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                                    </td>
                            </tr>
                            `;
                    cursor.continue();//Pasar al siguiebte registr
                }else{
                    console.log('No hay mas registros...');
                }
                // listadoClientes.innerHTML = '<p>No hay Registros</p>'
                
            }
        }
    }

    function eliminarRegistro(e){
        hayDatos();
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);
            const confirmar = confirm('¿Deseas eliminar al Cliente?');

            if(confirmar){
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function(){
                    console.log('Registro Eliminado');

                    //Eliminadel DOM
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function(){
                    console.log('Hubo un error al Eliminar');
                }
            }
        }
    }

     function hayDatos(){
        const request = window.indexedDB.open('crm', 1);

        request.onerror = function(){
            console.log('Hubo un error al abrir la BD para obtener clientes');
        }

        request.onsuccess = function(e){
            DB = e.target.result;

            //transaction para acceder a un object store
            const objectStore = DB.transaction('crm').objectStore('crm');//crm nombre tabla
            const hayDatos = objectStore.count();
            hayDatos.onsuccess = function(){
                if(hayDatos.result > 0){
                    console.log('Hay Registros')
                    
                }else{
                    noResultado.classList.add('text-center','p-2', 'text-gray-600')
                    noResultado.innerHTML = 'No hay Registros...';
                    document.querySelector('.containerTab').insertBefore(noResultado, document.querySelector('.table').nextSibling );
                }
            }
        }
                
    }
})();