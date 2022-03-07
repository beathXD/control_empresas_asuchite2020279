const Empresas = require('../models/empresa.model');
const Empleados = require('../models/empleado.model');

function CrearEmpresa(req, res) {
    var parametros = req.body;
    var modeloEmpresas = new Empresas();

    if (req.user.rol !== 'Admin') {
        return res.status(500).send({ mensaje: 'No es administrador' });
    }

    if (parametros.nombre && parametros.direccion) {
        modeloEmpresas.nombre = parametros.nombre;
        modeloEmpresas.direccion = parametros.direccion;

        modeloEmpresas.save((err, empresaGuardado) => {

            return res.send({ empresa: empresaGuardado });
        });
    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }


}

function EditEmpresa(req, res) {
    var idEm = req.params.idEmpresa;
    var parametros = req.body;

    if (req.user.rol !== 'Admin') {
        return res.status(500).send({ mensaje: 'No es administrador' });
    }

    Empresas.findByIdAndUpdate(idEm, parametros, { new: true }, (err, empresaEditada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!empresaEditada) return res.status(404)
            .send({ mensaje: 'Error al Editar' });

        return res.status(200).send({ empresa: empresaEditada });
    })
}

function EliminarEmpresa(req, res) {
    var idEm = req.params.idEmpresa;

    Empresas.findByIdAndDelete(idEm, (err, empresaEditada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!empresaEditada) return res.status(404)
            .send({ mensaje: 'Error al Editar' });

        return res.status(200).send({ empresa: empresaEditada });
    })
}


function AgregarEmpleado(req, res) {
    const parametros = req.body;
    const modeloEmpleados = new Empleados();

    if (parametros.nombre && parametros.apellido && parametros.edad && parametros.trabajo) {

        modeloEmpleados.nombre = parametros.nombre;
        modeloEmpleados.apellido = parametros.apellido;
        modeloEmpleados.edad = parametros.edad;
        modeloEmpleados.trabajo = parametros.trabajo;

        modeloEmpleados.save((err, empleadoGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoGuardado) return res.status(500).send({ mensaje: 'Error al guardar el empleado' });

            return res.status(200).send({ empleado: empleadoGuardado })
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros Obligatorios' });
    }


}


function AsignarEmpleados(req, res) {
    var idEmpre = req.params.idEmpresa;
    var idEmple = req.params.idEmpleado;

    Empresas.findByIdAndUpdate(idEmpre, { $push: { empleados: { idEmpleado: idEmple } } }, { new: true },
        (err, empleadoAgregado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
            if (!empleadoAgregado) return res.status(500).send({ mensaje: 'Error al agregar el empleado' });

            return res.status(200).send({ product: proveedorAgregado });
        })
}

function BuscarTEmpleados(req, res) {
    var idEmple = req.params.idEmpleado;

    Empresas.find({ empleados: { $elemMatch: { _id: idEmple, } } }, (err, empresasEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!empresasEncontradas) return res.status(500).send({ mensaje: 'Error al obtener los empleados por empresas' });

        return res.status(200).send({ productos: productosEncontrados })
    })

}

function BuscarEmpleado(req, res) {
    var parametros = req.body;

    Usuario.find({ nombre: parametros.nombre, apellido: parametros.apellido },
        { nombre: 1 }, (err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
            if (!usuariosEncontrados) return res.status(500)
                .send({ mensaje: 'Error al obtener los usuarios' })

            return res.status(200).send({ usuarios: usuariosEncontrados })
        })
}

module.exports = {

    CrearEmpresa,
    EditEmpresa,
    EliminarEmpresa,
    AgregarEmpleado,
    BuscarTEmpleados,
    AsignarEmpleados,
    BuscarEmpleado

}