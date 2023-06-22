const AbstractManager = require("./AbstractManager");

class WorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "workshop" });
  }

  insert(workshop) {
    const { date, place, commentary } = workshop;
    return this.database.query(
      `insert into ${this.table} (date, place, commentary) values (?,?,?)`,
      [date, place, commentary]
    );
  }

  update(workshop, id) {
    const { date, place, commentary } = workshop;
    return this.database.query(
      `update ${this.table} set date = ?, place = ?, commentary = ? where id = ?`,
      [date, place, commentary, id]
    );
  }
}

module.exports = WorkshopManager;
