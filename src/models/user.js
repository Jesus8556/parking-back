const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username:{
            type:String,
            required:true
        },
        email: {
            type: String,
            unique:true,
            required: true
        },
        password:{
            type:String,
            required: true
        },  
    },
);

userSchema.statics.encriptar = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}



userSchema.statics.comparar = async(password,receivedPassword) =>{
    return await bcrypt.compare(password,receivedPassword)
}

const User = mongoose.model('User',userSchema);

module.exports = User
