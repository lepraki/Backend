const {Schema, model} = require('mongoose');

const PerfilScheme = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenes: {
        data: Buffer,
        contentType: String,
        
    },
    fotoperfil: {
        data: Buffer,
        contentType: String,
        
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

    
});



module.exports = model('Perfil', PerfilScheme);