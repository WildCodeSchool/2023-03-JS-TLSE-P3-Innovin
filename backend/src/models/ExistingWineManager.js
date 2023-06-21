const AbstractManager = require("./AbstractManager");

class ExistingWineManager extends AbstractManager {
  constructor() {
    super({ table: "existing_wine" });
  }

  insert(existingWine) {
    const {
      vintage,
      blend,
      color,
      alcoholPercentage,
      picture,
      description,
      name,
      idWineRegion,
      idGrapeVariety,
      idWinery,
    } = existingWine;
    return this.database.query(
      `INSERT INTO ${this.table} (vintage, blend, color, alcoholPercentage, picture, description, name, idWineRegion, idGrapeVariety, idWinery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vintage,
        blend,
        color,
        alcoholPercentage,
        picture,
        description,
        name,
        idWineRegion,
        idGrapeVariety,
        idWinery,
      ]
    );
  }

  update(existingWine, id) {
    const {
      vintage,
      blend,
      color,
      alcoholPercentage,
      picture,
      description,
      name,
      idWineRegion,
      idGrapeVariety,
      idWinery,
    } = existingWine;
    return this.database.query(
      `UPDATE ${this.table} SET vintage = ?, blend = ?, color = ?, alcoholPercentage = ?, picture = ?, description = ?, name = ?, idWineRegion = ?, idGrapeVariety = ?, idWinery = ? WHERE id = ?`,
      [
        vintage,
        blend,
        color,
        alcoholPercentage,
        picture,
        description,
        name,
        idWineRegion,
        idGrapeVariety,
        idWinery,
        id,
      ]
    );
  }
}

module.exports = ExistingWineManager;
