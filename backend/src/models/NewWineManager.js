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
      ew.name AS wine_name,
      ew.vintage,
      gv.name AS grapeVariety,
      nw.selected_for_competition,
      nw.commentary AS commentaryWine,
      cs.competition_name,
      cs.commentary AS commentary_competition,
      w.place,
      w.datetime,
      tn.id_user,
      u.firstname,
      u.lastname
FROM ${this.table} nw
JOIN competition_selection cs ON cs.id = nw.id_competition_selection
JOIN selected_wine sw ON nw.id = sw.id_new_wine
JOIN tasting_note tn ON tn.id = sw.id_tasting_note
JOIN user u ON tn.id_user=u.id    
JOIN user_has_workshop uhw ON uhw.id_user = u.id
JOIN workshop w ON w.id = uhw.id_workshop
JOIN tastingnote_has_existingwine tnhe ON tn.id = tnhe.id_tasting_note
JOIN existing_wine ew ON ew.id = tnhe.id_existing_wine
JOIN grape_variety gv ON ew.id_grape_variety = gv.id`
    );
  }

  find(id) {
    return this.database.query(
      `SELECT
      nw.id,
      nw.color,
      sw.dosage,
      ew.name AS wine_name,
      ew.vintage,
      gv.name AS grapeVariety,
      nw.selected_for_competition,
      nw.commentary AS commentaryWine,
      tn.tasting_commentary AS commentaryTasting,
      w.place,
      w.datetime,
      tn.id_user,
      u.firstname,
      u.lastname
    FROM
    ${this.table} nw
      JOIN selected_wine sw ON nw.id = sw.id_new_wine
      JOIN tasting_note tn ON tn.id = sw.id_tasting_note
      JOIN user u ON tn.id_user = u.id
      JOIN user_has_workshop uhw ON u.id=uhw.id_user 
      JOIN workshop w ON uhw.id_workshop=w.id 
      JOIN tastingnote_has_existingwine tnhe ON tn.id = tnhe.id_tasting_note
      JOIN existing_wine ew ON ew.id = tnhe.id_existing_wine
      JOIN grape_variety gv ON ew.id_grape_variety = gv.id 
    WHERE
    nw.id = ?`,
      [id]
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

  updateCommentary(newWine, id) {
    const { commentary } = newWine;
    return this.database.query(
      `UPDATE ${this.table} SET commentary = ? WHERE id = ?`,
      [commentary, id]
    );
  }
}

module.exports = NewWineManager;
