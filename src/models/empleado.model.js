const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadoSchema = Schema({
    nombre: String,
    apellido: String,
    edad: String,
    trabajo: String
});

module.exports = mongoose.model('Empleados', EmpleadoSchema);