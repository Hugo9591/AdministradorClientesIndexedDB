//Conexion a la BD
let DB; 

function conectarDB(){
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror =  function(){
        console.log('Hubo un error al conectarse a la BD');
    }

    abrirConexion.onsuccess = function(){
        console.log('Se conecto a la BD');

        DB = abrirConexion.result;

    }
}

//Imprimir mensajes de alerta
function imprimirAlerta(mensaje, tipo){

    const alerta = document.querySelector('.alerta');//para que salga una ve el mensaje de error

    if(!alerta){
        
    const divAlerta = document.createElement('DIV');

    divAlerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

    if(tipo === 'error'){
        divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    }else{
        divAlerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
    }

    divAlerta.textContent = mensaje;

    formulario.appendChild(divAlerta);

    setTimeout(() => {
        divAlerta.remove();
    }, 3000);
    }
}