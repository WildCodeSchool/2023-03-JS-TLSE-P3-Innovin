const AbstractManager = require("./AbstractManager");

class GrapeVarietyManager extends AbstractManager {
  constructor() {
    super({ table: "grape_variety" });
  }

  insert(grapeVariety) {
    return this.database.query(
      `insert into ${this.table} (name, description) values (?, ?)`,
      [grapeVariety.name, grapeVariety.description]
    );
  }

  update(grapeVariety) {
    return this.database.query(
      `update ${this.table} set name = ?, description = ? where id = ?`,
      [grapeVariety.name, grapeVariety.description, grapeVariety.id]
    );
  }
}

module.exports = GrapeVarietyManager;
