/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class TastingAromasManager extends AbstractManager {
  constructor() {
    super({ table: "taste_flavor" });
  }

  getTastingDatas() {
    return this.database.query(
      `
        SELECT
            ti.intensity,
            NULL AS mouth_feel,
            NULL AS flavor
        FROM inovin.taste_intensity ti
        UNION ALL
        SELECT
            NULL AS intensity,
            tmf.mouth_feel,
            NULL AS flavor
        FROM
            inovin.taste_mouth_feel tmf
        UNION ALL
        SELECT
            NULL AS intensity,
            NULL AS mouth_feel,
            tf.flavor
        FROM inovin.${this.table} tf;`
    );
  }
}

module.exports = TastingAromasManager;
