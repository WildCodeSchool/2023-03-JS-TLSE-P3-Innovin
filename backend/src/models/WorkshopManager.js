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
      `update ${this.table} set datetime = ?, place = ?, commentary = ? where id = ?`,
      [datetime, place, commentary, id]
    );
  }
}

module.exports = WorkshopManager;
