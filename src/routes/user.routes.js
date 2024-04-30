const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller");
const {verifyToken} = require("../middlewares/authjwt")


router.get("/",userController.getUser);

router.get("/perfil",verifyToken,userController.getPerfil);

router.get("/:userId",userController.getUserById);

router.put("/:userId",userController.updateUser);

router.patch("/:userId", userController.updateUser);

router.delete("/:userId",userController.deleteUser);


module.exports = router