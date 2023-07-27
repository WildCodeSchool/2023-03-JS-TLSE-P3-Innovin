/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class OlfactiveAromasHasTastingNoteManager extends AbstractManager {
  constructor() {
    super({ table: "olfactive_aromas_has_tasting_note" });
  }

  insert(id_tasting_note, id_olfactive) {
    return this.database.query(
      `insert into ${this.table} (id_tasting_note , id_olfactive) values (?, ?)`,
      [id_tasting_note, id_olfactive]
    );
  }

  update(olfactiveAromasHasTastingNote, id) {
    const { nom, label } = olfactiveAromasHasTastingNote;
    return this.database.query(
      `update ${this.table} set nom = ?, label = ? where id = ?`,
      [nom, label, id]
    );
  }
}

module.exports = OlfactiveAromasHasTastingNoteManager;
