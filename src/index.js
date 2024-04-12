const app = require("./app");
require("dotenv").config();
require("./database")
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Servidor escuchando en ', port))