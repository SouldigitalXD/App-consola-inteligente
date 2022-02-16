const Tarea = require('./Tarea');

/** 
*  _listado:
*      { 'uuid-132132-564531-432023as : { id:12, desc:asd, completadoEn:12-2-2022 } },
*/

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => listado.push(this._listado[key]) );
        return listado;
    };

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {

        if ( this._listado[id]) {
             delete this._listado[id];
        }

    };

    cargarTareasArr( tareas = [] ) {

        tareas.forEach( tarea => {
           this._listado[ tarea.id ] = tarea;
        });
    };

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[ tarea.id ] = tarea;
    };

    listadoCompleto() {

        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${ i + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);


        });

    };

    listarTareaPendienteCompletada( completadas = true ) {

        let counter = 0;
        this.listadoArr.forEach( (tarea) => {

            
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'completada'.green
                                : 'Pendiente'.red;
    
            if ( completadas ) {
                
                if ( completadoEn ) {
                    
                    counter += 1;
                    console.log(`${ (counter + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }


            } else {

                if ( !completadoEn ) {
                    
                    counter += 1;
                    console.log(`${ (counter + '.').green } ${ desc } :: ${ estado }`);
                }

            }


        });
        
    };

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
                
            };

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
                 
            }
        })


    };

}



module.exports = Tareas;