const AbstractManager = require("./AbstractManager");

class WorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "workshop" });
  }

  insert(workshop) {
    const { datetime, place, commentary } = workshop;
    return this.database.query(
      `insert into ${this.table} (datetime, place, commentary) values (?,?,?)`,
      [datetime, place, commentary]
    );
  }

  update(workshop, id) {
    const { datetime, place, commentary } = workshop;
    return this.database.query(
      `update ${this.table} set datetime = ?, place = ?, commentary = ? WHERE id = ?`,
      [datetime, place, commentary, id]
    );
  }

  findWorkshopByDate(date) {
    return this.database.query(
      `select datetime, place, commentary, wine_type, COUNT(id_user) FROM ${this.table} LEFT JOIN user_has_workshop as uw ON uw.id_workshop = workshop.id WHERE CONCAT(SUBSTRING(DATE(datetime),9,2),SUBSTRING(DATE(datetime),6,2),SUBSTRING(DATE(datetime),1,4)) = ? GROUP BY datetime,place,commentary, wine_type;`,
      [date]
    );
  }
}

module.exports = WorkshopManager;
