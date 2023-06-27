/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class VisualManager extends AbstractManager {
  constructor() {
    super({ table: "visual_limpidity" });
  }

  getVisualDatas() {
    return this.database.query(
      `
    SELECT
        vl.limpidity,
        NULL AS brightness,
        NULL AS tears,
        NULL AS intensity
    FROM
        inovin.${this.table} vl
    UNION ALL
    SELECT
        NULL AS limpidity,
        vb.brightness,
        NULL AS tears,
        NULL AS intensity
    FROM
        inovin.visual_brightness vb
    UNION ALL
    SELECT
        NULL AS limpidity,
        NULL AS brightness,
        vt.tears,
        NULL AS intensity
    FROM inovin.visual_tears vt
    UNION ALL
    SELECT
        NULL AS limpidity,
        NULL AS brightness,
        NULL AS tears,
        vi.intensity
    FROM
        inovin.visual_intensity vi;`
    );
  }
}

module.exports = VisualManager;
