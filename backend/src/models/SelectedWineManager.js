const AbstractManager = require("./AbstractManager");

class SelectedWineManager extends AbstractManager {
  constructor() {
    super({ table: "Selected_wine" });
  }

  insert(selectedWine) {
    const { nom, label } = selectedWine;
    return this.database.query(
      `insert into ${this.table} (nom , label) values (?, ?)`,
      [nom, label]
    );
  }

  update(selectedWine, id) {
    const { nom, label } = selectedWine;
    return this.database.query(
      `update ${this.table} set nom = ?, label = ? where id = ?`,
      [nom, label, id]
    );
  }
}

module.exports = SelectedWineManager;
