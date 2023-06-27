require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");
const GrapeVarietyManager = require("./GrapeVarietyManager");
const UserManager = require("./UserManager");
const ExistingWineManager = require("./ExistingWineManager");
const AppellationManager = require("./AppellationManager");
const WineRegionManager = require("./WineRegionManager");
const WorkshopManager = require("./WorkshopManager");
const NewWineManager = require("./NewWineManager");
const CompetitionSelectionManager = require("./CompetitionSelectionManager");
const VisualManager = require("./VisualManager");
const OlfactiveManager = require("./OlfactiveManager");
const TasteManager = require("./TasteManager");
const TastingAromasManager = require("./TastingAromasManager");

models.item = new ItemManager();
models.item.setDatabase(pool);

models.grapeVariety = new GrapeVarietyManager();
models.grapeVariety.setDatabase(pool);

models.user = new UserManager();
models.user.setDatabase(pool);

models.existingWine = new ExistingWineManager();
models.existingWine.setDatabase(pool);

models.appellation = new AppellationManager();
models.appellation.setDatabase(pool);

models.wineRegion = new WineRegionManager();
models.wineRegion.setDatabase(pool);

models.workshop = new WorkshopManager();
models.workshop.setDatabase(pool);

models.newWine = new NewWineManager();
models.newWine.setDatabase(pool);

models.competitionSelection = new CompetitionSelectionManager();
models.competitionSelection.setDatabase(pool);

models.visualData = new VisualManager();
models.visualData.setDatabase(pool);

models.olfactiveData = new OlfactiveManager();
models.olfactiveData.setDatabase(pool);

models.tasteSlidersData = new TasteManager();
models.tasteSlidersData.setDatabase(pool);

models.tasteAromasData = new TastingAromasManager();
models.tasteAromasData.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = { models: new Proxy(models, handler), pool };
