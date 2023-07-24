/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ExistingWineManager extends AbstractManager {
  constructor() {
    super({ table: "existing_wine" });
  }

  findOneExistingWineByTastingNoteId(id) {
    return this.database.query(
      `SELECT  ew.name AS wine_name,
      gv.name AS grape_variety 
      FROM ${this.table} ew
      JOIN tastingnote_has_existingwine tnhe ON ew.id = tnhe.id_existing_wine
       JOIN tasting_note tn ON tn.id = tnhe.id_tasting_note
       JOIN grape_variety gv ON ew.id_grape_variety = gv.id  
       WHERE tn.id = ?`,
      [id]
    );
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
    w.website,
    ap.name AS appellation_name,
    ap.label
FROM  ${this.table} ew
    JOIN wine_region wr ON wr.id = ew.id_wine_region
    JOIN grape_variety gv ON gv.id = ew.id_grape_variety
    JOIN winery w ON w.id = ew.id_winery 
    JOIN existing_wine_has_appellation ewha ON ew.id = ewha.id_existing_wine
    JOIN appellation ap ON ap.id = ewha.id_appellation WHERE ew.id = ? AND ew.is_archived = 0`,
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
    w.website,
    ap.name AS appellation_name,
    ap.label
FROM  ${this.table} ew
    JOIN wine_region wr ON wr.id = ew.id_wine_region
    JOIN grape_variety gv ON gv.id = ew.id_grape_variety
    JOIN winery w ON w.id = ew.id_winery
    JOIN existing_wine_has_appellation ewha ON ew.id = ewha.id_existing_wine
    JOIN appellation ap ON ap.id = ewha.id_appellation 
    WHERE ew.is_archived = 0;`);
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
      id_wine_region,
      id_grape_variety,
      id_winery,
    } = existingWine;
    return this.database.query(
      `INSERT INTO ${this.table} (vintage, blend, color, alcohol_percentage, picture, description, name, id_wine_region, id_grape_variety, id_winery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vintage,
        blend,
        color,
        alcohol_percentage,
        picture,
        description,
        name,
        id_wine_region,
        id_grape_variety,
        id_winery,
      ]
    );
  }

  insertEwHasAppellation(ids) {
    const { id_existing_wine, id_appellation } = ids;
    return this.database.query(
      `INSERT INTO existing_wine_has_appellation (id_existing_wine, id_appellation) VALUES (?, ?)`,
      [id_existing_wine, id_appellation]
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
      id_wine_region,
      id_grape_variety,
      id_winery,
      is_archived,
    } = existingWine;
    return this.database.query(
      `UPDATE ${this.table} SET vintage = ?, blend = ?, color = ?, alcohol_percentage = ?, picture = ?, description = ?, name = ?, id_wine_region = ?, id_grape_variety = ?, id_winery = ?, is_archived = ? WHERE id = ?`,
      [
        vintage,
        blend,
        color,
        alcohol_percentage,
        picture,
        description,
        name,
        id_wine_region,
        id_grape_variety,
        id_winery,
        is_archived,
        id,
      ]
    );
  }
}

module.exports = ExistingWineManager;
