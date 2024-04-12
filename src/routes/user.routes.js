const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller");



router.get("/",userController.getUser);

router.get("/:userId",userController.getUserById);

router.put("/:userId",userController.updateUser);

router.delete("/:userId",userController.deleteUser);


module.exports = router