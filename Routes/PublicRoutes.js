const express = require('express');
const { listarPost, crearPublicacion, actualizarPost, eliminarPost } = require('../controllers/PublicController');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');

// CRUD de listas
router.get('/:ir', listarPost);
router.post('/:ir', validarJWT, crearPublicacion);
router.put('/:ir/:id', validarJWT, actualizarPost);
router.delete('/:ir/:id', validarJWT, eliminarPost);

// Exportar Rutas
module.exports = router;