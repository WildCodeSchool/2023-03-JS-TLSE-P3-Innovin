const AbstractManager = require("./AbstractManager");

class GrapeVarietyManager extends AbstractManager {
  constructor() {
    super({ table: "grape_variety" });
  }

  insert(grapeVariety) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      grapeVariety.title,
    ]);
  }

  update(grapeVariety) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [grapeVariety.title, grapeVariety.id]
    );
  }
}

module.exports = GrapeVarietyManager;
