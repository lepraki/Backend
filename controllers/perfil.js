const Perfil = require("../Models/Perfil");

async function crearPerfil(req, res = express.request) {
  const perfil = new Perfil(req.body);

  try {
    perfil.usuario = req.uid;
    const saved = await perfil.save();
    // Retorna el Perfil Creado
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

async function listarPerfil(req, res = express.request) {
  try {
    const perfiles = await Perfil.find();

    res.status(200).json({
      ok: true,
      perfiles
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error'
    });
  }
}

async function buscarPerfil(req, res = express.request) {
  try {
    let id = req.params.ir;
    // Buscar el Perfil
    const perfil = await Perfil.findById(id);

    res.status(200).json({
      ok: true,
      perfil
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error'
    });
  }
}

module.exports = {
  crearPerfil,
  listarPerfil,
  buscarPerfil
};