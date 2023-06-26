/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CompetitionSelection extends AbstractManager {
  constructor() {
    super({ table: "competition_selection" });
  }

  findAllWinesSelectedforCompetition() {
    return this.database.query(`SELECT
  cs.competition_name,
  cs.commentary AS commentary_competition,
  nw.color,
  nw.commentary AS commentary_wine,
  sw.dosage,
  ex.vintage
FROM ${this.table} cs
  JOIN new_wine nw ON cs.id = nw.id_competition_selection
  JOIN selected_wine sw ON nw.id = sw.id_new_wine
  JOIN tasting_note tn ON tn.id = sw.id_tasting_note
  JOIN tastingnote_has_existingwine tnhe ON tn.id = tnhe.id_tasting_note
  JOIN existing_wine ex ON ex.id = tnhe.id_existing_wine
WHERE
  nw.selected_for_competition = 1`);
  }

  findWineByCompetition(id) {
    return this.database.query(
      `SELECT
      cs.competition_name,
      cs.commentary AS commentary_competition,
      nw.color,
      nw.commentary AS commentary_wine,
  sw.dosage,
  ex.vintage
FROM ${this.table} cs
  JOIN new_wine nw ON cs.id = nw.id_competition_selection
  JOIN selected_wine sw ON nw.id = sw.id_new_wine
  JOIN tasting_note tn ON tn.id = sw.id_tasting_note
  JOIN tastingnote_has_existingwine tnhe ON tn.id = tnhe.id_tasting_note
  JOIN existing_wine ex ON ex.id = tnhe.id_existing_wine
WHERE
  nw.selected_for_competition = 1  AND cs.id = ?`,
      [id]
    );
  }

  insert(competitionSelection) {
    const { competition_name, commentary } = competitionSelection;
    return this.database.query(
      `insert into ${this.table} (commentary) values (?)`,
      [competition_name, commentary]
    );
  }

  update(competitionSelection, id) {
    const { competition_name, commentary } = competitionSelection;
    return this.database.query(
      `update ${this.table} set commentary = ? where id = ?`,
      [competition_name, commentary, id]
    );
  }
}

module.exports = CompetitionSelection;
