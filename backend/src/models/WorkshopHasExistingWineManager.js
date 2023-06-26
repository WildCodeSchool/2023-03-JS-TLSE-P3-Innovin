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
    ex.vintage
FROM
${this.table} whe
    JOIN workshop w ON w.id = whe.id_workshop
    JOIN existing_wine ex ON ex.id = whe.id_existing_wine;`);
  }

  insert(item) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      item.title,
    ]);
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = WorkshopHasExistingWineManager;
