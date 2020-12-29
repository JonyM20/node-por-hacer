

const fs = require('fs');
const { CLIENT_RENEG_LIMIT } = require('tls');
const { describe } = require('yargs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) =>{
        if (err) throw new Error ('No se pudo guardar el archivo')
    })

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
        
    } catch (error) {
        
        listadoPorHacer = [];

    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return console.log(porHacer);
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index > -1 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();
    
    return new Promise((resolve, reject) => {
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        if (index > -1) {
            listadoPorHacer.splice(index,1);
            guardarDB();
            resolve('Elemento eliminado correctamente')
        }else {
            reject('Elemento no encontrado');
        }
        
    }) 
}

module.exports = {
    crear,      
    guardarDB,
    getListado,
    actualizar,
    borrar
}