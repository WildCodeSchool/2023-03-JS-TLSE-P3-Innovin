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
    } = newWine;
    return this.database.query(
      `insert into ${this.table} (color,selected_for_competition,commentary,id_competition_selection) values (?,?,?,?)`,
      [color, selected_for_competition, commentary, id_competition_selection]
    );
  }

  update(newWine, id) {
    const {
      color,
      selected_for_competition,
      commentary,
      id_competition_selection,
    } = newWine;
    return this.database.query(
      `UPDATE ${this.table} SET color = ?, selected_for_competition = ?, commentary = ?, id_competition_selection = ? WHERE id = ?`,
      [
        color,
        selected_for_competition,
        commentary,
        id_competition_selection,
        id,
      ]
    );
  }
}

module.exports = NewWineManager;
