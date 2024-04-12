const express = require("express");
const morgan = require("morgan")
const cors = require("cors");
const moongose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");

const pkg = require("../package.json");
const authRoutes = require("./routes/auth.routes");
const garageRoutes = require("./routes/garage.routes");
const ofertaRoutes = require("./routes/oferta.routes");
const userRoutes = require("./routes/user.routes");
const contraRoutes = require("./routes/contra.routes")

app.use(cors());
app.use('/public',express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./uploads"
}));


app.use("/api/auth",authRoutes);
app.use("/api/garage",garageRoutes);
app.use("/api/oferta",ofertaRoutes);
app.use("/api/user",userRoutes);
app.use("/api/contraoferta",contraRoutes);    

app.set('pkg',pkg);
app.get('/',(req,res) =>{
    res.json({
        name:app.get("pkg").name,
        author: app.get('pkg').author,
        description:app.get("pkg").description,
        version:app.get("pkg").version

    })
});



module.exports = app;
