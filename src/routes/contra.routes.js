const express = require("express");
const router = express.Router();
const contraController = require("../controllers/contra.controller");

const {verifyToken} = require("../middlewares/authjwt");

router.post("/:ofertaId",verifyToken,contraController.createOferta);

router.get("/",contraController.getOferta);
router.get("/:ofertaId",contraController.getOfertaById);
router.put("/:ofertaId",contraController.updateOferta);
router.delete("/:ofertaId",contraController.deleteOferta);

module.exports = router;
