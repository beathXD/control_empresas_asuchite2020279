const express = require('express');
const cors = require('cors');
const app = express();

const empresasRoutes = require('./src/routes/empresa.routes');
const usuariosRoutes = require('./src/routes/usuario.routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', usuariosRoutes, empresasRoutes);

module.exports = app;