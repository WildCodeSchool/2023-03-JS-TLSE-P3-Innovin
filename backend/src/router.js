const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const GrapeVarietyControllers = require("./controllers/GrapeVarietyControllers");

router.get("/grapevariety", GrapeVarietyControllers.browse);
router.get("/grapevariety/:id", GrapeVarietyControllers.read);
router.put("/grapevariety/:id", GrapeVarietyControllers.edit);
router.post("/grapevariety", GrapeVarietyControllers.add);
router.delete("/grapevariety/:id", GrapeVarietyControllers.destroy);

module.exports = router;
