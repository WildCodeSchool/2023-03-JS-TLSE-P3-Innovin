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
            ta.alcohol,
            NULL AS acidity,
            NULL AS sweetness,
            NULL AS taste_tannin
        FROM inovin.taste_alcohol ta
        UNION ALL
        SELECT
            NULL AS alcohol,
            ac.${this.table},
            NULL AS sweetness,
            NULL AS taste_tannin
        FROM inovin.${this.table} ac
        UNION ALL
        SELECT
            NULL AS alcohol,
            NULL AS acidity,
            ts.sweetness,
            NULL AS taste_tannin
        FROM inovin.taste_sweetness ts
        UNION ALL
        SELECT
            NULL AS alcohol,
            NULL AS acidity,
            NULL AS sweetness,
            tt.taste_tannin
        FROM inovin.taste_tannin tt;`
    );
  }
}

module.exports = TasteManager;
