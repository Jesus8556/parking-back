const mongoose = require("mongoose");

const garageSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true
        },
        status:{
            type:Boolean,
            default:true
        },
        description:{
            type:String,
            required:true
        },
        isAvailable: {
            type: Boolean,
            required: true
        },
        pricePerHour:{
            type:Number,
            required: true
        },
        imagen:{
            public_id:String,
            secure_url:String
        },
        user:{
            ref:"User",
            type:mongoose.Schema.Types.ObjectId

        },
        latitud:{
            type:Number
        },
        longitud:{
            type:Number
        }
        
    },{
        timestamps:true,
        versionkey:false
    }
);

const Garage = mongoose.model('Garage',garageSchema);

module.exports = {
    Garage
}