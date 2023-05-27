const PublicModel = require("../Models/PublicModel");
const Perfil = require("../Models/Perfil");

async function crearProducto(req, res = express.request) {
  const producto = new Producto(req.body);
  producto.restaurante = req.params.ir;

  try {
    const saved = await producto.save();

    // Retorna el Producto Creado
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

async function listarProductos(req, res = express.request) {
  try {
    let id = req.params.ir;
    // Buscar el Restaurante y los Productos
    const restaurante = await Restaurante.findById(id);
    const productos = await Producto.find({restaurante: id});

    res.status(200).json({
      ok: true,
      restaurante,
      productos
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error'
    });
  }
}

async function actualizarProducto(req, res = express.request) {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto.restaurante == req.params.ir) {
      producto.nombre = req.body.nombre;
      producto.precio = req.body.precio;

      await producto.save();

      res.status(200).json({
        ok: true,
        producto
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Producto no Encontrado'
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

async function eliminarProducto(req, res = express.request) {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto.restaurante == req.params.ir) {
      await producto.delete();

      res.status(200).json({
        ok: true
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Producto no Encontrado'
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
  crearProducto,
  listarProductos,
  actualizarProducto,
  eliminarProducto
};