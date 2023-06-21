const AbstractManager = require("./AbstractManager");

class WineRegionManager extends AbstractManager {
  constructor() {
    super({ table: "wine_region" });
  }

  insert(wineRegion) {
    const { name } = wineRegion;
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      name,
    ]);
  }

  update(wineRegion, id) {
    const { name } = wineRegion;
    return this.database.query(
      `update ${this.table} set name = ?,  where id = ?`,
      [name, id]
    );
  }
}

module.exports = WineRegionManager;
