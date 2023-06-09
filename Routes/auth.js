const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/Auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-token');

// Ruta para Logear Usuario
router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario
);

// Ruta para Crear Usuario
router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
);

// Un solo middleware no requiere arreglo
router.get('/renew', validarJWT, revalidarToken);
// Exportar Rutas
module.exports = router;