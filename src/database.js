
const moongose = require("mongoose");
require("dotenv").config();

moongose
    .connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log('Conectado a la base de datos');
    })
    .catch((error) => console.error(error));