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
    ew.color,
    ew.vintage,
    ew.name AS wine_name,
    gv.name AS grape_variety 
FROM
${this.table} whe
    JOIN workshop w ON w.id = whe.id_workshop
    JOIN existing_wine ew ON ew.id = whe.id_existing_wine
    JOIN grape_variety gv ON ew.id_grape_variety = gv.id`);
  }

  findOneWorkshopHasExistingWine(id_workshop) {
    return this.database.query(
      `SELECT
      whe.id_workshop,
      w.place,
      w.datetime,
      whe.id_existing_wine,
      ew.vintage,
      ew.name AS wine_name,
     gv.name AS grape_variety  
   FROM
    ${this.table} whe
      JOIN workshop w ON w.id = whe.id_workshop
      JOIN existing_wine ew ON ew.id = whe.id_existing_wine
      JOIN grape_variety gv ON ew.id_grape_variety = gv.id
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
