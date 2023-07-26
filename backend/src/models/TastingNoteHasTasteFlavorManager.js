/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TastingNoteHasTasteFlavorManager extends AbstractManager {
  constructor() {
    super({ table: "tasting_note_has_taste_flavor" });
  }

  insert(id_tasting_note, id_taste_flavor) {
    return this.database.query(
      `insert into ${this.table} (id_tasting_note , id_taste_flavor) values (?, ?)`,
      [id_tasting_note, id_taste_flavor]
    );
  }

  update(tastingNoteHasTasteFlavor, id) {
    const { nom, label } = tastingNoteHasTasteFlavor;
    return this.database.query(
      `update ${this.table} set nom = ?, label = ? where id = ?`,
      [nom, label, id]
    );
  }
}

module.exports = TastingNoteHasTasteFlavorManager;
