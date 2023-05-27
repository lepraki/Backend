const fs = require('fs');
const path = require('path');

const multer = require("multer");
const PublicModel = require('../Models/PublicModel');
const Perfil = require("../Models/Perfil");

// ------------------------
// Configuracion del Multer
// ------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// -----------------------------
// Controladores de las Imagenes
// -----------------------------

async function imagenPerfil(req, res = express.request) {
  try {
    let update = {
      imagen: req.files?.imagen ? {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files['imagen'].filename)),
        contentType: 'image/png'
      } : undefined,
  
      logo: req.files?.logo ? {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files['logo'].filename)),
        contentType: 'image/png'
      } : undefined
    }

    // Guardar las imagenes del Perfil
    const saved = await Perfil.findOneAndUpdate(
      {usuario: req.params.ir}, update
    );

    // Retorna la publicacion Creada
    res.json({
      ok: true,
      perfil: saved
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      task: 'Internal Error'
    });
  }
}

async function imagenPublicacion(req, res = express.request) {
  const publicacion = PublicModel.findById(req.params.id);

  if (req.files?.imagen)
    publicacion.imagen = {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files['imagen'].filename)),
      contentType: 'image/png'
    };

  try {
    // Guardar las imagenes del Perfil
    const saved = await publicacion.save();

    // Retorna la publicacion Creada
    res.json({
      ok: true,
      publicacion: saved
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      task: 'Internal Error'
    });
  }
}
module.exports = {upload, imagenPerfil, imagenPublicacion};