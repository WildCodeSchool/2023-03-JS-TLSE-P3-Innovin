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
router.post("/grapevariety", GrapeVarietyControllers.add);
router.put("/grapevariety/:id", GrapeVarietyControllers.edit);
router.delete("/grapevariety/:id", GrapeVarietyControllers.destroy);

const UserControllers = require("./controllers/UserControllers");
const { hashPassword } = require("./auth");
const { validateUser } = require("./validators");

router.get("/users", UserControllers.browse);
router.get("/users/:id", UserControllers.read);
router.post("/users", hashPassword, validateUser, UserControllers.add);
router.put("/users/:id", hashPassword, validateUser, UserControllers.edit);
router.delete("/users/:id", UserControllers.destroy);

module.exports = router;
