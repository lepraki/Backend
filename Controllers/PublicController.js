const PublicModel = require("../Models/PublicModel");
const Perfil = require("../Models/Perfil");

async function crearPublicacion(req, res = express.request) {
  const publicacion = new Publicacion(req.body);
  publicacion.perfil = req.params.ir;

  try {
    const saved = await publicacion.save();

    // Retorna el Post Creado
    res.json({
      ok: true,
      task: saved
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      task: 'Internal Error'
    });
  }
}

async function listarPost(req, res = express.request) {
  try {
    let id = req.params.ir;
    // Buscar el perfil y los Post
    const perfil = await Perfil.findById(id);
    const publicacion = await PublicModel.find({perfil: id});

    res.status(200).json({
      ok: true,
      perfil,
      publicacion
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error'
    });
  }
}

async function actualizarPost(req, res = express.request) {
  try {
    const publicacion = await Publicion.findById(req.params.id);
    if (publicacion.perfil == req.params.ir) {
      publicacion.descripcion = req.body.descripcion;
      

      await producto.save();

      res.status(200).json({
        ok: true,
        publicacion
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Post no Encontrado'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error'
    });
  }
}

async function eliminarPost(req, res = express.request) {
  try {
    const publicacion = await Publicion.findById(req.params.id);
    if (publicacion.restaurante == req.params.ir) {
      await publicacion.delete();

      res.status(200).json({
        ok: true
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Post no Encontrado'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error'
    });
  }
}

module.exports = {
  crearPublicacion,
  listarPost,
  actualizarPost,
  eliminarPost
};