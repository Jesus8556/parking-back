const mongoose = require("mongoose");

const contraSchema = mongoose.Schema(
    {
        oferta:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Oferta",
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        monto:{
            type:Number,
            required:true
        },
          
    },
    {
        timestamps:true,
        versionKey:false
    }
    
);

const contraOferta = mongoose.model("Contraoferta",contraSchema);

module.exports = {
    contraOferta
};