/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class NewWineManager extends AbstractManager {
  constructor() {
    super({ table: "new_wine" });
  }

  insert(newWine) {
    const {
      color,
      selected_for_competition,
      commentary,
      id_competition_selection,
      id_tasting_note,
    } = newWine;
    return this.database.query(
      `insert into ${this.table} (color,selected_for_competition,commentary,id_competition_selection,id_tasting_note) values (?,?,?,?,?)`,
      [
        color,
        selected_for_competition,
        commentary,
        id_competition_selection,
        id_tasting_note,
      ]
    );
  }

  update(newWine, id) {
    const {
      color,
      selected_for_competition,
      commentary,
      id_competition_selection,
      id_tasting_note,
    } = newWine;
    return this.database.query(
      `UPDATE ${this.table} SET color = ?, selected_for_competition = ?, commentary = ?, id_competition_selection = ?, id_tasting_note = ? WHERE id = ?`,
      [
        color,
        selected_for_competition,
        commentary,
        id_competition_selection,
        id_tasting_note,
        id,
      ]
    );
  }
}

module.exports = NewWineManager;
