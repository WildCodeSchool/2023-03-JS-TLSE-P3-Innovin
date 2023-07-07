/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class TasteManager extends AbstractManager {
  constructor() {
    super({ table: "acidity" });
  }

  getMouthSlidersDatas() {
    return this.database.query(
      `
        SELECT
            ta.id AS alcohol_id,
            ta.alcohol,
            NULL AS acidity_id,
            NULL AS acidity,
            null AS sweetness_id,
            NULL AS sweetness,
            NULL AS tannin_id,
            NULL AS taste_tannin
        FROM inovin.taste_alcohol ta
        UNION ALL
        SELECT
            NULL AS alcohol_id,
            NULL AS alcohol,
            ac.id AS acidity_id,
            ac.${this.table},
            NULL AS sweetness_id,
            NULL AS sweetness,
            NULL AS tannin_id,
            NULL AS taste_tannin
        FROM inovin.${this.table} ac
        UNION ALL
        SELECT
            NULL AS alcohol_id,
            NULL AS alcohol,
            NULL AS acidity_id,
            NULL AS acidity,
            ts.id AS sweetness_id,
            ts.sweetness,
            NULL AS tannin_id,
            NULL AS taste_tannin
        FROM inovin.taste_sweetness ts
        UNION ALL
        SELECT
            NULL AS alcohol_id,
            NULL AS alcohol,
            NULL AS acidity_id,
            NULL AS acidity,
            NULL AS sweetness_id,
            NULL AS sweetness,
            tt.id AS tannin_id,
            tt.taste_tannin
        FROM inovin.taste_tannin tt;`
    );
  }
}

module.exports = TasteManager;
