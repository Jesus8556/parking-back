const {app,server} = require("./app");


require("dotenv").config();
require("./database")
const port = process.env.PORT || 4000;
server.listen(port, () => console.log('Servidor escuchando en ', port))