/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class NewWineManager extends AbstractManager {
  constructor() {
    super({ table: "new_wine" });
  }

  insert(newWine) {
    const { color, selected_for_competition, commentary } = newWine;
    return this.database.query(
      `insert into ${this.table} (color,selected_for_competition,commentary) values (?,?,?)`,
      [color, selected_for_competition, commentary]
    );
  }

  update(newWine, id) {
    const { color, selected_for_competition, commentary } = newWine;
    return this.database.query(
      `update ${this.table} set color= ?,selected_for_competition ?,commentary= ? where id = ?`,
      [color, selected_for_competition, commentary, id]
    );
  }
}

module.exports = NewWineManager;
