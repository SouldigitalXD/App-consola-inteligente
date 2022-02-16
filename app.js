require('colors');

const { inquirerMenu,
    btnEnter,
    leerInput,
    menuListaBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/Tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');//ejemplo manual


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){
        // Establecer las tareas
        tareas.cargarTareasArr( tareasDB );

    }

    do {
        //imprime el menu
        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                //crear opcion
            const desc = await leerInput('Descripcion: ');
            tareas.crearTarea( desc );
            break;
            
            case '2':
            tareas.listadoCompleto();
                break;

            case '3':
            tareas.listarTareaPendienteCompletada(true);
                break;

            case '4':
            tareas.listarTareaPendienteCompletada(false);
                break;
            
            case '5':
            const ids = await mostrarListadoCheckList( tareas.listadoArr );
            tareas.toggleCompletadas(ids);
                break;
            
            case '6':
                const id = await menuListaBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok =  await confirmar('¿Estas seguro que deseas Borrar?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente');
                    }

                }
                break;

            }
            
            guardarDB( tareas.listadoArr );
            
            await btnEnter();
            
        
    } while( opt !== '0' );
    

};


main();