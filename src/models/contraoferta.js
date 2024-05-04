const mongoose = require("mongoose");

const contraSchema = mongoose.Schema(
    {
        oferta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Oferta",
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        userAccept: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
 
        garage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Garage',
        },
        estado: {
            type: String,
            enum: ['Pendiente', 'Aceptada', 'Rechazada'], // Enum para el estado de la contraoferta
            default: 'Pendiente',
        },
        pago:{
            type: String,
            enum: ["Pendiente","Yape","Plin","Efectivo"],
            default:"Pendiente",

        },

        monto: {
            type: Number,
            required: true
        },
        fechaCreacion: {
            type: Date,
            default: Date.now,
          },


    },
    {
        timestamps: true,
        versionKey: false
    }

);

const contraOferta = mongoose.model("Contraoferta", contraSchema);

module.exports = {
    contraOferta
};