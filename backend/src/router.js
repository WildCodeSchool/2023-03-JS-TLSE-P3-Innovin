const express = require("express");

const router = express.Router();

// --------------------------------------- Import Controllers ---------------------------------------
const GrapeVarietyControllers = require("./controllers/GrapeVarietyControllers");
const UserControllers = require("./controllers/UserControllers");
const { hashPassword, verifyToken, verifyPassword } = require("./auth");
const { validateUser } = require("./validators");

const AppellationControllers = require("./controllers/AppellationControllers");

const { verifyAdminCredentials } = UserControllers;

// ----------------------------------------- Public routes -------------------------------------------

router.post(
  "/users/login",
  UserControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.get("/grapevariety", GrapeVarietyControllers.browse);
router.get("/grapevariety/:id", GrapeVarietyControllers.read);
router.get("/appellation", AppellationControllers.browse);
router.get("/appellation/:id", AppellationControllers.read);

// ---------------------------------------- Private Routes ----------------------------------------------

router.use(verifyToken);

router.get("/users/:id", UserControllers.read);
router.post("/users", hashPassword, validateUser, UserControllers.add);
router.put("/users/:id", hashPassword, validateUser, UserControllers.edit);

// ----------------------------------------- Admin routes ------------------------------------------------

router.use(verifyAdminCredentials);

router.get("/users", UserControllers.browse);
router.delete("/users/:id", UserControllers.destroy);
router.get("/admin/workshop/:id", UserControllers.getUserRegisteredToAWorkshop);
router.post("/grapevariety", GrapeVarietyControllers.add);
router.put("/grapevariety/:id", GrapeVarietyControllers.edit);
router.delete("/grapevariety/:id", GrapeVarietyControllers.destroy);
router.post("/appellation", AppellationControllers.add);
router.put("/appellation/:id", AppellationControllers.edit);
router.delete("/appellation/:id", AppellationControllers.destroy);

module.exports = router;
