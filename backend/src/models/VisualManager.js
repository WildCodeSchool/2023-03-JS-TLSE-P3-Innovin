/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class VisualManager extends AbstractManager {
  constructor() {
    super({ table: "visual_limpidity" });
  }

  getVisualDatas() {
    const query = `
      SELECT
      vl.id AS vl_id,
      vl.limpidity,
      NULL AS vb_id,
      NULL AS brightness,
      NULL AS vi_id,
      NULL AS intensity,
      NULL AS vt_id,
      NULL AS tears
  FROM
      inovin.${this.table} vl
  UNION ALL
  SELECT
      NULL AS vl_id,
      NULL AS limpidity,
      vb.id AS vb_id,
      vb.brightness,
      NULL AS vi_id,
      NULL AS intensity,
      NULL AS vt_id,
      NULL AS tears
  FROM
      inovin.visual_brightness vb
  UNION ALL
  SELECT
      NULL AS vl_id,
      NULL AS limpidity,
      NULL AS vb_id,
      NULL AS brightness,
      vi.id AS vi_id,
      vi.intensity,
      NULL AS vt_id,
      NULL AS tears
  FROM
      inovin.visual_intensity vi
  UNION ALL
  SELECT
      NULL AS vl_id,
      NULL AS limpidity,
      NULL AS vb_id,
      NULL AS brightness,
      NULL AS vi_id,
      NULL AS intensity,
      vt.id AS vt_id,
      vt.tears
  FROM
      inovin.visual_tears vt;
  `;

    return this.database.query(query);
  }
}

module.exports = VisualManager;
