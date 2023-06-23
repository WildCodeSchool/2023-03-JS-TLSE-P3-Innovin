const express = require("express");

const router = express.Router();

// --------------------------------------- Import Controllers ---------------------------------------
const GrapeVarietyControllers = require("./controllers/GrapeVarietyControllers");
const UserControllers = require("./controllers/UserControllers");
const { hashPassword, verifyToken, verifyPassword } = require("./auth");
const { validateUser } = require("./validators");
const ExistingWineControllers = require("./controllers/ExistingWineControllers");
const WineRegionControllers = require("./controllers/WineRegionControllers");
const TastingSheetsDatasControllers = require("./controllers/TastingSheetsDatasControllers");
const AppellationControllers = require("./controllers/AppellationControllers");
const WorkshopControllers = require("./controllers/WorkshopControllers");

const { verifyAdminCredentials } = UserControllers;

// ----------------------------------------- Public routes -------------------------------------------

router.post("/users", hashPassword, validateUser, UserControllers.add);
router.post(
  "/users/login",
  UserControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.get(
  "/tastingsheetsdatas",
  TastingSheetsDatasControllers.findTastingSheetsDatas
);
router.get("/grapevariety", GrapeVarietyControllers.browse);
router.get("/grapevariety/:id", GrapeVarietyControllers.read);
router.get("/existingwine", ExistingWineControllers.browse);
router.get("/existingwine/:id", ExistingWineControllers.read);
router.get("/appellation", AppellationControllers.browse);
router.get("/appellation/:id", AppellationControllers.read);
router.get("/wineregion", WineRegionControllers.browse);
router.get("/wineregion/:id", WineRegionControllers.read);

// ---------------------------------------- Private Routes ----------------------------------------------

router.use(verifyToken);

router.get("/users/:id", UserControllers.read);
router.put("/users/:id", hashPassword, validateUser, UserControllers.edit);

// ----------------------------------------- Admin routes ------------------------------------------------

router.use(verifyAdminCredentials);

router.get("/users", UserControllers.browse);
router.delete("/users/:id", UserControllers.destroy);
router.get("/admin/workshop/:id", UserControllers.getUserRegisteredToAWorkshop);
router.post("/grapevariety", GrapeVarietyControllers.add);
router.put("/grapevariety/:id", GrapeVarietyControllers.edit);
router.delete("/grapevariety/:id", GrapeVarietyControllers.destroy);
router.post("/existingwine", ExistingWineControllers.add);
router.put("/existingwine/:id", ExistingWineControllers.edit);
router.delete("/existingwine/:id", ExistingWineControllers.destroy);
router.post("/appellation", AppellationControllers.add);
router.put("/appellation/:id", AppellationControllers.edit);
router.delete("/appellation/:id", AppellationControllers.destroy);
router.post("/wineregion", WineRegionControllers.add);
router.put("/wineregion/:id", WineRegionControllers.edit);
router.delete("/wineregion/:id", WineRegionControllers.destroy);
router.get("/workshop", WorkshopControllers.browse);
router.get("/workshop/:id", WorkshopControllers.read);
router.put("/workshop/:id", WorkshopControllers.edit);
router.post("/workshop", WorkshopControllers.add);
router.delete("/workshop/:id", WorkshopControllers.destroy);

module.exports = router;
