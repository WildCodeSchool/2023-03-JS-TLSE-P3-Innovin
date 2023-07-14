/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class WorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "workshop" });
  }

  insert(workshop) {
    const { datetime, place, commentary, wine_type } = workshop;
    return this.database.query(
      `insert into ${this.table} (datetime, place, commentary, wine_type) values (?,?,?,?)`,
      [datetime, place, commentary, wine_type]
    );
  }

  update(workshop, id) {
    const { datetime, place, commentary, wine_type } = workshop;

    return this.database.query(
      `update ${this.table} set datetime = ?, place = ?, commentary = ?, wine_type = ? WHERE id = ?`,
      [datetime, place, commentary, wine_type, id]
    );
  }

  findAllWorkshops() {
    return this.database.query(
      `SELECT id, datetime, place, commentary, wine_type, COUNT(id_user) AS attendees FROM ${this.table} LEFT JOIN user_has_workshop as uw ON uw.id_workshop = workshop.id GROUP BY id, datetime, place, commentary, wine_type; `
    );
  }

  findWorkshopByDate(date) {
    return this.database.query(
      `SELECT id, datetime, place, commentary, wine_type, COUNT(id_user) AS attendees FROM ${this.table} LEFT JOIN user_has_workshop as uw ON uw.id_workshop = workshop.id WHERE CONCAT(SUBSTRING(DATE(datetime),9,2),SUBSTRING(DATE(datetime),6,2),SUBSTRING(DATE(datetime),1,4)) = ? GROUP BY id, datetime, place, commentary, wine_type;`,
      [date]
    );
  }

  findNextWorkshops() {
    return this.database.query(
      `SELECT commentary, place, wine_type, datetime, COUNT(id_user) AS attendees FROM ${this.table} JOIN user_has_workshop as uw ON uw.id_workshop = workshop.id  WHERE datetime > NOW() GROUP BY datetime, place, wine_type, commentary LIMIT 5 ;`
    );
  }
}

module.exports = WorkshopManager;
