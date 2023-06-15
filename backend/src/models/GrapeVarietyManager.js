const AbstractManager = require("./AbstractManager");

class GrapeVarietyManager extends AbstractManager {
  constructor() {
    super({ table: "grape_variety" });
  }

  insert(grape) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      grape.title,
    ]);
  }

  update(grape) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [grape.title, grape.id]
    );
  }
}

module.exports = GrapeVarietyManager;
