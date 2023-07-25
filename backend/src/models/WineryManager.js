/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class WineryManager extends AbstractManager {
  constructor() {
    super({ table: "winery" });
  }

  insert(winery) {
    const { name, productor_name, address, zip_code, city, website } = winery;
    return this.database.query(
      `insert into ${this.table} (name, productor_name, address, zip_code, city, website) values (?, ?, ?, ?, ?, ?)`,
      [name, productor_name, address, zip_code, city, website]
    );
  }

  update(winery, id) {
    const { name, productor_name, address, zip_code, city, website } = winery;
    return this.database.query(
      `update ${this.table} set name = ?, productor_name = ?, address = ?, zip_code = ?, city = ?, website = ? where id = ?`,
      [name, productor_name, address, zip_code, city, website, id]
    );
  }
}

module.exports = WineryManager;
