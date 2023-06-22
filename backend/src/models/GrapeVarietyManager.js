const AbstractManager = require("./AbstractManager");

class GrapeVarietyManager extends AbstractManager {
  constructor() {
    super({ table: "grape_variety" });
  }

  insert(grapeVariety) {
    const { name, description } = grapeVariety;
    return this.database.query(
      `insert into ${this.table} (name, description) values (?, ?)`,
      [name, description]
    );
  }

  update(grapeVariety, id) {
    const { name, description } = grapeVariety;
    return this.database.query(
      `update ${this.table} set name = ?, description = ? where id = ?`,
      [name, description, id]
    );
  }
}

module.exports = GrapeVarietyManager;
