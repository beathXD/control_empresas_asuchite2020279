const express = require('express');
const controladorEmpresas = require('../controller/empresas.controller');
const md_authentication = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/CrearEmpresa',  md_authentication.Auth, controladorEmpresas.CrearEmpresa);
api.put('/EditEmpresa/:idEmpresa',  md_authentication.Auth, controladorEmpresas.EditEmpresa);
api.delete('/DeleteEmpresa/:idEmpresa',  md_authentication.Auth, controladorEmpresas.EliminarEmpresa);
api.post('/AgregarEmpleado',  md_authentication.Auth, controladorEmpresas.AgregarEmpleado);
api.put('/AsignarEmpleados/:idEmpresa',  md_authentication.Auth, controladorEmpresas.AsignarEmpleados);


module.exports = api;