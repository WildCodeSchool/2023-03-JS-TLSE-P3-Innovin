/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TastingNoteHasExistingWineManager extends AbstractManager {
  constructor() {
    super({ table: "tastingnote_has_existingwine" });
  }

  insert(id_tasting_note, id_existing_wine) {
    return this.database.query(
      `insert into ${this.table} (id_tasting_note , id_existing_wine) values (?, ?)`,
      [id_tasting_note, id_existing_wine]
    );
  }

  update(tastingNoteHasExistingWine, id) {
    const { nom, label } = tastingNoteHasExistingWine;
    return this.database.query(
      `update ${this.table} set nom = ?, label = ? where id = ?`,
      [nom, label, id]
    );
  }
}

module.exports = TastingNoteHasExistingWineManager;
