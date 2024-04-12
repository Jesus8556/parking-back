const express = require("express");
const router = express.Router();
const ofertaController = require("../controllers/oferta.controller");
const {verifyToken} = require("../middlewares/authjwt")

router.post("/",verifyToken,ofertaController.createOferta);
router.get("/",ofertaController.getOferta);
router.get("/:ofertaId",ofertaController.getOfertaById);
router.put("/:ofertaId",ofertaController.updateOferta);
router.delete("/:ofertaId",ofertaController.deleteOferta);


module.exports = router;
