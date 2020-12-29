const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}



const argv = require('yargs')
    .command('crear','Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar','Actualiza el estado de un elemento', {
        descripcion, 
        completado
    })
    .command('borrar', 'Este comando borra el alamento enviado', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}
