/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class WorkshopHasExistingWineManager extends AbstractManager {
  constructor() {
    super({ table: "workshop_has_existingwine" });
  }

  findAllWorkshopHasExistingWine() {
    return this.database.query(`
SELECT
    whe.id_workshop,
    w.place,
    w.datetime,
    whe.id_existing_wine,
    ex.color,
    ex.vintage
FROM
${this.table} whe
    JOIN workshop w ON w.id = whe.id_workshop
    JOIN existing_wine ex ON ex.id = whe.id_existing_wine;`);
  }

  findOneWorkshopHasExistingWine(id_workshop) {
    return this.database.query(
      `SELECT
      whe.id_workshop,
      w.place,
      w.datetime,
      whe.id_existing_wine,
      ex.vintage,
      gv.name AS grape_variety
  FROM
  ${this.table} whe
      JOIN workshop w ON w.id = whe.id_workshop
      JOIN existing_wine ex ON ex.id = whe.id_existing_wine
      JOIN grape_variety gv ON gv.id = ex.id_grape_variety
WHERE
id_workshop = ?`,
      [id_workshop]
    );
  }

  insert(workshopHasExistingwine) {
    const { id_workshop, id_existing_wine } = workshopHasExistingwine;
    return this.database.query(
      `insert into ${this.table} (id_existing_wine,id_workshop) values (?,?) `,
      [id_workshop, id_existing_wine]
    );
  }

  deleteworkshop(id_workshop) {
    return this.database.query(
      `delete from ${this.table} where id_workshop = ? `,
      [id_workshop]
    );
  }
}

module.exports = WorkshopHasExistingWineManager;
