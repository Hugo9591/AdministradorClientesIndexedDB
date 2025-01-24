(function (){
    let DB;
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',  function(){
        conectarDB();

        //Actualizar Registros
        formulario.addEventListener('submit', actualizarCliente);

        //Leer parametros de la url(id)
        //window.location.search nos da el parametro pasado por el url 
        const parametrosUrl = new URLSearchParams(window.location.search);

        idCliente = parametrosUrl.get('id');
        console.log(idCliente);

        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 1000);//Necesita su tiepo para coectarse a la BD
        }
    });

    function actualizarCliente(e){
        e.preventDefault();
        
        //Validar
        if(nombreInput.value === '' || emailInput === '' || empresaInput.value === '' || telefonoInput.value === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }
        //si pasa la validacion entonces se actualiza el cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)//el id viene en forma de string entonces asi no lo va a encontrar
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        //AGregar cliente actualizado a la BD
        objectStore.put(clienteActualizado);

        transaction.oncomplete = function (){
            imprimirAlerta('Editado Correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error', 'error');
        }
    }

    function obtenerCliente(id){
        //Para obtener el cliente debemos conectarnos a la BD
        const transaction = DB.transaction('crm', 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e){
            const cursor = e.target.result;

            if(cursor){
                console.log(cursor.value);//Muestra todos los registros
                if(cursor.value.id === Number(id)){//traer el regitro actual
                    console.log(cursor.value);
                    llenarFormulario(cursor.value);//Funcion con el registro actual para llenar automaticamente los inputs
                }

                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente){
        const { nombre, email, telefono, empresa} = datosCliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    function conectarDB(){
        //Abre la BD o la crea si no existe
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror =  function(){
            console.log('Hubo un error al conectarse a la BD');
        }

        abrirConexion.onsuccess = function(){
            console.log('Se conecto a la BD');
            DB = abrirConexion.result;
        }
    }
})();