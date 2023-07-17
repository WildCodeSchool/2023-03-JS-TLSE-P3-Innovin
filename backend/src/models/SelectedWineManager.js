/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class SelectedWineManager extends AbstractManager {
  constructor() {
    super({ table: "Selected_wine" });
  }

  insert(selectedWine) {
    const { dosage, id_new_wine, id_tasting_note } = selectedWine;
    return this.database.query(
      `insert into ${this.table} (dosage , id_new_wine,id_tasting_note) values (?, ?,?)`,
      [dosage, id_new_wine, id_tasting_note]
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
