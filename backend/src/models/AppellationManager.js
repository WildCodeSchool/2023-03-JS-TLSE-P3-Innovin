const AbstractManager = require("./AbstractManager");

class AppellationManager extends AbstractManager {
  constructor() {
    super({ table: "appellation" });
  }

  insert(appellation) {
    const { nom, label } = appellation;
    return this.database.query(
      `insert into ${this.table} (nom , label) values (?, ?)`,
      [nom, label]
    );
  }

  update(appellation, id) {
    const { nom, label } = appellation;
    return this.database.query(
      `update ${this.table} set nom = ?, label = ? where id = ?`,
      [nom, label, id]
    );
  }
}

module.exports = AppellationManager;
