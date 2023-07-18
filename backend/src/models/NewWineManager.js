/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class NewWineManager extends AbstractManager {
  constructor() {
    super({ table: "new_wine" });
  }

  insertNewWine(newWine) {
    const { color } = newWine;
    return this.database.query(`INSERT INTO ${this.table} (color) VALUES (?)`, [
      color,
    ]);
  }

  findNewWineCreated(idNewWine) {
    return this.database.query(`SELECT id FROM ${this.table} WHERE id = ?`, [
      idNewWine,
    ]);
  }

  findNewWineIdByWorskhop(idWorkshop) {
    return this.database.query(
      `SELECT nw.id FROM new_wine nw 
      JOIN workshop w ON w.id_new_wine=nw.id 
      WHERE w.id = ?;`,
      [idWorkshop]
    );
  }

  findNewWine() {
    return this.database.query(
      `SELECT
      nw.id,
      nw.color,
      sw.dosage,
      ex.vintage,
      nw.selected_for_competition,
      nw.commentary AS commentary_wine,
      cs.competition_name,
      cs.commentary AS commentary_competition,
      w.place,
      w.datetime,
      tn.id_user,
      u.firstname,
      u.lastname
FROM ${this.table} nw
JOIN competition_selection cs ON cs.id = nw.id_competition_selection
JOIN workshop w ON w.id_new_wine = nw.id
JOIN selected_wine sw ON nw.id = sw.id_new_wine
JOIN tasting_note tn ON tn.id = sw.id_tasting_note
JOIN user u ON tn.id_user=u.id
JOIN tastingnote_has_existingwine tnhe ON tn.id = tnhe.id_tasting_note
JOIN existing_wine ex ON ex.id = tnhe.id_existing_wine`
    );
  }

  findNewWineByUserId(idUser, idWorkshop) {
    return this.database.query(
      `SELECT
      nw.id,
      nw.color,
      sw.dosage,
      ex.vintage,
      nw.selected_for_competition,
      nw.commentary AS commentary_wine,
      cs.competition_name,
      cs.commentary AS commentary_competition,
      w.place,
      w.datetime,
      tn.id_user,
      u.firstname,
      u.lastname
    FROM
    ${this.table} nw
      JOIN competition_selection cs ON cs.id = nw.id_competition_selection
      JOIN selected_wine sw ON nw.id = sw.id_new_wine
      JOIN tasting_note tn ON tn.id = sw.id_tasting_note
      JOIN user u ON tn.id_user = u.id
      JOIN user_has_workshop uhw ON u.id=uhw.id_user 
      JOIN workshop w ON uhw.id_workshop=w.id 
      JOIN tastingnote_has_existingwine tnhe ON tn.id = tnhe.id_tasting_note
      JOIN existing_wine ex ON ex.id = tnhe.id_existing_wine
    WHERE
      tn.id_user = ? AND w.id = ?`,
      [idUser, idWorkshop]
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
