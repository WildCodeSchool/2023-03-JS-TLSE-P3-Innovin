/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class OlfactiveManager extends AbstractManager {
  constructor() {
    super({ table: "olfactive_aromas" });
  }

  getOlfactiveDatas() {
    return this.database.query(
      `SELECT
        oa.intensity_aromas,
        NULL AS complexity,
        NULL AS aromas
    FROM
        inovin.olfactive_intensityAromas oa
    UNION ALL
    SELECT
        NULL AS intensity_aromas,
        oc.complexity,
        NULL AS aromas
    FROM
        inovin.olfactive_complexity oc
    UNION ALL
    SELECT
        NULL AS intensity_aromas,
        NULL AS complexity,
        oa.aromas
    FROM
        inovin.${this.table} oa;`
    );
  }
}

module.exports = OlfactiveManager;
