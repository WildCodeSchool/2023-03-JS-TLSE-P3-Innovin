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
            ti.id AS intensity_id,
            ti.intensity,
            NULL AS mouth_feel_id,
            NULL AS mouth_feel,
            NULL AS flavor_id,
            NULL AS flavor
        FROM inovin.taste_intensity ti
        UNION ALL
        SELECT
            NULL AS intensity_id,
            NULL AS intensity,
            tmf.id AS mouth_feel_id,
            tmf.mouth_feel,
            NULL AS flavor_id,
            NULL AS flavor
        FROM
            inovin.taste_mouth_feel tmf
        UNION ALL
        SELECT
            NULL AS intensity_id,
            NULL AS intensity,
            NULL AS mouth_feel_id,
            NULL AS mouth_feel,
            tf.id AS flavor_id,
            tf.flavor
        FROM inovin.${this.table} tf;`
    );
  }
}

module.exports = TastingAromasManager;
