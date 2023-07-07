/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class OlfactiveManager extends AbstractManager {
  constructor() {
    super({ table: "olfactive_aromas" });
  }

  getOlfactiveDatas() {
    return this.database.query(
      `SELECT
        oa.id AS intensity_id,
        oa.intensity_aromas,
        NULL AS complexity_id,
        NULL AS complexity,
        NULL AS aromas_id,
        NULL AS aromas
    FROM
        inovin.olfactive_intensityAromas oa
    UNION ALL
    SELECT
        NULL AS intensity_id,
        NULL AS intensity_aromas,
        oc.id AS complexity_id,
        oc.complexity,
        NULL AS aromas_id,
        NULL AS aromas
    FROM
        inovin.olfactive_complexity oc
    UNION ALL
    SELECT
        NULL AS intensity_id,
        NULL AS intensity_aromas,
        NULL AS complexity_id,
        NULL AS complexity,
        oa.id AS aromas_id,
        oa.aromas
    FROM
        inovin.${this.table} oa;`
    );
  }
}

module.exports = OlfactiveManager;
