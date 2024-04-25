const mongoose = require("mongoose")

const ofertaSchema = mongoose.Schema(
    {
        filtroAlquiler: {
            type: Boolean,
            required: true
        },//ok
        monto: {
            type: Number,
            require: true
        },
        user: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId
        },
        name:{
            type:String,  
        },
        ignoredBy: [{ // Agregamos esto para rastrear usuarios que ignoran
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        latitud: {
            type: Number,

        },
        longitud: {
            type: Number
        }
      
    },
    {
        timestamps: true,
        versionkey: false
    }

);
const Oferta = mongoose.model('Oferta', ofertaSchema);

module.exports = {
    Oferta
}