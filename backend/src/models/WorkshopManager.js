/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class WorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "workshop" });
  }

  insertWorkshop(workshop, idNewWine) {
    const { datetime, place } = workshop;
    return this.database.query(
      `INSERT INTO ${this.table} (datetime, place, id_new_wine) VALUES (?, ?, ?)`,
      [datetime, place, idNewWine]
    );
  }

  update(workshop, id) {
    const { datetime, place, commentary } = workshop;
    return this.database.query(
      `update ${this.table} set datetime = ?, place = ?, commentary = ? where id = ?`,
      [datetime, place, commentary, id]
    );
  }

  findWorkshopByDate(date) {
    return this.database.query(
      `select * from ${this.table} where CONCAT(SUBSTRING(DATE(datetime),9,2),SUBSTRING(DATE(datetime),6,2),SUBSTRING(DATE(datetime),1,4)) = ?`,
      [date]
    );
  }
}

module.exports = WorkshopManager;
