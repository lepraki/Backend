const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');
const { imagenPublicacion, imagenPerfil, upload } = require("../controllers/FotosController");

// Subir Imagenes del Restaurante
router.post('/perfil/:ir', 
    upload.fields(
        [
          {name: 'imagenes', maxCount: 1},
          {name: 'fotoperfil', maxCount: 1},
        ]
      ),
  imagenPerfil);

// Subir Imagen del Producto
router.post('/post/:id', [validarJWT, upload.single("imagen")], imagenPublicacion);

module.exports = router;