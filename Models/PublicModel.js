const {
    Schema,
    model
} = require('mongoose');

const PublicacionScheme = Schema({
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String,
        
    },
    perfil: {
        type: Schema.Types.ObjectId,
        ref: 'Perfil',
        required: true
    }
});



module.exports = model('PublicModel', PublicacionScheme);