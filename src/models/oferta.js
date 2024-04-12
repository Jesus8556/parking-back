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