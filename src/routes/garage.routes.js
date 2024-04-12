const express = require("express")
const router = express.Router()
const garageController = require("../controllers/garage.controller");
const {verifyToken} = require("../middlewares/authjwt")

router.post("/",verifyToken,garageController.createGarage);

router.get("/",verifyToken,garageController.getGarage);

router.get("/allgarage",garageController.getAllGarage);

router.get("/:garageId",garageController.getGarageById);

router.put("/:garageId",verifyToken,garageController.updateGarage);

router.delete("/:garageId",garageController.deleteGarage);


module.exports = router;

