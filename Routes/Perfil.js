const express = require('express');
const { crearPerfil, listarPerfil, buscarPerfil } = require('../controllers/perfil');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');

// CRUD de listas
router.get('/', listarPerfil);
router.get('/:ir', buscarPerfil);
router.post('/', validarJWT, crearPerfil);

// Exportar Rutas
module.exports = router;