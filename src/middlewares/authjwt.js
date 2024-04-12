const jwt = require("jsonwebtoken")
const config = require("../config")
const User = require("../models/user")
const verifyToken = async (req, res, next) => {
    try {
         const token = req.headers["x-access-token"]
        console.log(token)

        if (!token) return res.status(403).json({ message: "No hay token " })

        const decoded = jwt.verify(token, config.SECRET)

        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "El usuario no existe" })
        next()

    } catch (error) {
        return res.status(500).json({message:"no autorizado"})

    } 

}


module.exports = {
    verifyToken
}
