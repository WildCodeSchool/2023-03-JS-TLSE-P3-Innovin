/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ExistingWineManager extends AbstractManager {
  constructor() {
    super({ table: "existing_wine" });
  }

  findOneExistingWine(id) {
    return this.database.query(
      `SELECT
      ew.id,
    ew.vintage,
    ew.blend,
    ew.color,
    ew.alcohol_percentage,
    ew.picture,
    ew.description,
    ew.name,
    gv.name AS grape_variety_name,
    gv.description AS grape_variety_description,
    wr.name AS wine_region_name,
    w.name AS winery_name,
    w.productor_name,
    w.address,
    w.zip_code,
    w.city,
    w.website
FROM  ${this.table} ew
    JOIN wine_region wr ON wr.id = ew.id_wine_region
    JOIN grape_variety gv ON gv.id = ew.id_grape_variety
    JOIN winery w ON w.id = ew.id_winery WHERE ew.id = ?`,
      [id]
    );
  }

  findAllExistingWines() {
    return this.database.query(`SELECT
    ew.id,
    ew.vintage,
    ew.blend,
    ew.color,
    ew.alcohol_percentage,
    ew.picture,
    ew.description,
    ew.name,
    gv.name AS grape_variety_name,
    gv.description AS grape_variety_description,
    wr.name AS wine_region_name,
    w.name AS winery_name,
    w.productor_name,
    w.address,
    w.zip_code,
    w.city,
    w.website
FROM  ${this.table} ew
    JOIN wine_region wr ON wr.id = ew.id_wine_region
    JOIN grape_variety gv ON gv.id = ew.id_grape_variety
    JOIN winery w ON w.id = ew.id_winery;`);
  }

  insert(existingWine) {
    const {
      vintage,
      blend,
      color,
      alcohol_percentage,
      picture,
      description,
      name,
      id_Wine_Region,
      id_Grape_Variety,
      id_Winery,
    } = existingWine;
    return this.database.query(
      `INSERT INTO ${this.table} (vintage, blend, color, alcohol_percentage, picture, description, name, id_Wine_Region, id_Grape_Variety, id_Winery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vintage,
        blend,
        color,
        alcohol_percentage,
        picture,
        description,
        name,
        id_Wine_Region,
        id_Grape_Variety,
        id_Winery,
      ]
    );
  }

  update(existingWine, id) {
    const {
      vintage,
      blend,
      color,
      alcohol_percentage,
      picture,
      description,
      name,
      id_Wine_Region,
      id_Grape_Variety,
      id_Winery,
    } = existingWine;
    return this.database.query(
      `UPDATE ${this.table} SET vintage = ?, blend = ?, color = ?, alcohol_percentage = ?, picture = ?, description = ?, name = ?, id_Wine_Region = ?, id_Grape_Variety = ?, id_Winery = ? WHERE id = ?`,
      [
        vintage,
        blend,
        color,
        alcohol_percentage,
        picture,
        description,
        name,
        id_Wine_Region,
        id_Grape_Variety,
        id_Winery,
        id,
      ]
    );
  }
}

module.exports = ExistingWineManager;
