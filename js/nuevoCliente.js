(function(){
    // let DB;

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', function(){
        conectarDB();

        formulario.addEventListener('submit', validarFormulario);
    });

    function validarFormulario(e){
        e.preventDefault();
        
        //Obtener valor de los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        //crear obj con la inf
        const cliente = {
            nombre, 
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente){
        console.log(DB);

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error al agregar al cliente', 'error');
        }

        transaction.oncomplete = function(){
            console.log('Cliente agregado...');

            imprimirAlerta('El cliente se agrego correctamente');

            formulario.reset();

            //Mandar a otra pantalla/archivo
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
})();